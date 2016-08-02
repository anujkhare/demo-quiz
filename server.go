/**
 * This has been adapted from the react tutorial by facebook.
 */

package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
	"time"
)

type Option struct {
	Uid string `json:"uid"`
	Str string `json:"str"`
}

type Question struct {
	Id       string   `json:"id"`
	Str      string   `json:"str"`
	Correct  []string `json:"correct"`
	Opt      []Option `json:"opt"`
	Positive float64  `json:"positive"`
	Negative float64  `json:"negative"`
	Tags     []string `json:"tags"`
}

type Score struct {
	LastScore  float64 `json:"lastScore"`
	TotalScore float64 `json:"totalScore"`
}

type UserStatus struct {
	curQuestionIndex int
	score            Score
	startedAt        time.Time
}

type Message struct {
	Token string `json: "token"`
	Type  string `json: "type"`
	Data  json.RawMessage
}

const (
	OK            = "OK"
	INVALIDTOKEN  = "InvalidToken"
	QUIZCOMPLETED = "QuizCompleted"
)

const dataFile = "./quiz.json"
const totalTime = time.Second * 90

var AllowedUsers = []string{}
var questions []Question
var userStatsMap map[string]UserStatus

func getQuestions() []Question {
	// Stat the file, so we can find its current permissions
	_, err := os.Stat(dataFile)
	if err != nil {
		fmt.Printf("Unable to stat the data file (%s): %s", dataFile, err)
		return nil
	}

	// Read the questions from the file.
	commentData, err := ioutil.ReadFile(dataFile)
	if err != nil {
		fmt.Printf("Unable to read the data file (%s): %s", dataFile, err)
		return nil
	}
	// fmt.Printf("%s", commentData)
	var questions []Question
	if err := json.Unmarshal(commentData, &questions); err != nil {
		fmt.Printf("Unable to Unmarshal questions from data file (%s): %s", dataFile, err)
		return nil
	}
	return (questions)
}

func testEq(a, b []string) bool {
	if a == nil && b == nil {
		return true
	}
	if a == nil || b == nil {
		return false
	}
	if len(a) != len(b) {
		return false
	}
	for i := range a {
		if a[i] != b[i] {
			return false
		}
	}
	return true
}

func handleSubmit(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "POST":
		message := decodeQuery(w, r)

		userStats, ok := userStatsMap[message.Token]
		if !ok {
			sendStatus(w, INVALIDTOKEN)
			return
		}
		curQuestionIndex := userStats.curQuestionIndex
		score := userStats.score
		startedAt := userStats.startedAt

		if message.Type != "GET" { // evaluate the response
			// Evaluate the answer
			fmt.Println("Evaluate!")

			var optionsSelected []string
			err := json.Unmarshal([]byte(message.Data), &optionsSelected)
			sort.Strings(optionsSelected)

			if err != nil {
				http.Error(w, fmt.Sprintf("Unable to parse form: %s", err), http.StatusInternalServerError)
				return
			}
			fmt.Println(optionsSelected)

			curQuestion := questions[curQuestionIndex]
			fmt.Println(curQuestion.Correct)
			if len(optionsSelected) == 0 {
				score.LastScore = 0
			} else if testEq(optionsSelected, curQuestion.Correct) {
				score.LastScore = curQuestion.Positive
			} else {
				score.LastScore = -curQuestion.Negative
			}
			score.TotalScore += score.LastScore
			curQuestionIndex++
		}

		status := OK
		nextques := Question{}
		// get the next question
		numQuestions := len(questions)
		if curQuestionIndex == numQuestions { // Qs are over OR time is over
			fmt.Println("Done!")
			status = QUIZCOMPLETED
			// sendStatus(w, QUIZCOMPLETED)
			// return
		} else {
			nextques = questions[curQuestionIndex]
		}

		quesScore := struct {
			Status   string   `json: "Status"`
			NextQues Question `json:"question"`
			CurScore Score    `json:"score"`
		}{Status: status, NextQues: nextques, CurScore: score}
		// Don't send the correct answers, but a string with no. of correct answers!
		quesScore.NextQues.Correct = []string{strconv.Itoa(len(quesScore.NextQues.Correct))}

		// Marshal the questions to indented json.
		quesScoreData, err := json.MarshalIndent(quesScore, "", "    ")
		if err != nil {
			http.Error(w, fmt.Sprintf("Unable to marshal questions to json: %s", err), http.StatusInternalServerError)
			return
		}

		// set the parameters again!
		userStatsMap[message.Token] = UserStatus{curQuestionIndex: curQuestionIndex,
			score: score, startedAt: startedAt}

		io.Copy(w, bytes.NewReader(quesScoreData))

	default:
		// Don't know the method, so error
		http.Error(w, fmt.Sprintf("Unsupported method: %s", r.Method), http.StatusMethodNotAllowed)
	}
}

func decodeQuery(w http.ResponseWriter, r *http.Request) Message {
	var query Message
	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&query); err != nil {
		http.Error(w, fmt.Sprintf("Unable to parse form: %s", err), http.StatusInternalServerError)
		return (Message{Token: "NA"})
	}
	fmt.Println(query)
	return (query)
}

func handleTime(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "POST":
		fmt.Println("GET TIME!")
		message := decodeQuery(w, r)

		userStats, ok := userStatsMap[message.Token]
		if !ok {
			sendStatus(w, INVALIDTOKEN)
			return
		}
		startedAt := userStats.startedAt
		fmt.Println(startedAt)

		timeElapsed := time.Since(startedAt).Seconds()
		quizTime := struct {
			Status      string  `json: "Status"`
			TimeElapsed float64 `json: "time1"`
			TimeLeft    float64 `json: "time2"`
		}{OK, timeElapsed, float64(totalTime.Seconds()) - timeElapsed}
		fmt.Println(quizTime)

		// Marshal the time to indented json.
		timeData, err := json.MarshalIndent(quizTime, "", "    ")
		if err != nil {
			http.Error(w, fmt.Sprintf("Unable to marshal time to json: %s", err), http.StatusInternalServerError)
			return
		}

		// stream the contents of the file to the response
		io.Copy(w, bytes.NewReader(timeData))

	default:
		// Don't know the method, so error
		http.Error(w, fmt.Sprintf("Unsupported method: %s", r.Method), http.StatusMethodNotAllowed)
	}
}

func stringInSlice(target string, list []string) bool {
	for _, s := range list {
		if s == target {
			return true
		}
	}
	return false
}

func sendStatus(w http.ResponseWriter, status string) {
	// Marshal
	data, err := json.MarshalIndent(struct {
		Status string `json: "Status"`
	}{Status: status}, "", "    ")
	if err != nil {
		http.Error(w, fmt.Sprintf("Unable to marshal time to json: %s", err), http.StatusInternalServerError)
		return
	}

	fmt.Println(status)
	// stream the contents of the file to the response
	io.Copy(w, bytes.NewReader(data))
}

func handleAuth(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	switch r.Method {
	case "POST":
		fmt.Println("GET TIME!")
		message := decodeQuery(w, r)

		status := OK
		_, ok := userStatsMap[message.Token]
		if !ok { // user session isn't active
			if b := stringInSlice(message.Token, AllowedUsers); !b {
				// http.Error(w, fmt.Sprintf("Invalid token"), http.StatusInternalServerError)
				// return
				status = INVALIDTOKEN
			} else {
				// create a map for the user
				userStatsMap[message.Token] = UserStatus{startedAt: time.Now(),
					score: Score{0.0, 0.0}, curQuestionIndex: 0}
			}
		}

		sendStatus(w, status)
		fmt.Println(userStatsMap)

	default:
		// Don't know the method, so error
		http.Error(w, fmt.Sprintf("Unsupported method: %s", r.Method), http.StatusMethodNotAllowed)
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}

	// Get the questions
	questions = getQuestions()
	// init users map
	userStatsMap = make(map[string]UserStatus)

	// list of allowed users
	for i := 1; i <= 20; i++ {
		AllowedUsers = append(AllowedUsers, fmt.Sprintf("user%d", i))
	}
	fmt.Println(AllowedUsers)

	// The API of the server
	http.HandleFunc("/api/answers", handleSubmit)
	http.HandleFunc("/api/time", handleTime)
	http.HandleFunc("/api/auth", handleAuth)
	http.Handle("/", http.FileServer(http.Dir("./dist")))

	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
