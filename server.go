/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

package main

import (
	"bytes"
	// "time"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sort"
	"strconv"
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

type QuesScore struct {
	NextQues Question `json:"question"`
	CurScore Score    `json:"score"`
}

const dataFile = "./quiz.json"

var questions []Question
var curQuestionIndex int
var score Score

func getQuestions() []Question {
	// Stat the file, so we can find its current permissions
	_, err := os.Stat(dataFile)
	if err != nil {
		fmt.Printf("Unable to stat the data file (%s): %s", dataFile, err)
		return nil
	}

	// Read the comments from the file.
	commentData, err := ioutil.ReadFile(dataFile)
	if err != nil {
		fmt.Printf("Unable to read the data file (%s): %s", dataFile, err)
		return nil
	}
	// fmt.Printf("%s", commentData)
	var questions []Question
	if err := json.Unmarshal(commentData, &questions); err != nil {
		fmt.Printf("Unable to Unmarshal comments from data file (%s): %s", dataFile, err)
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
	// Since multiple requests could come in at once, ensure we have a lock
	// around all file operations

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	switch r.Method {
	case "POST":
		fmt.Println("POST!")

		decoder := json.NewDecoder(r.Body)
		var optionsSelected []string
		err := decoder.Decode(&optionsSelected)
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

		// get the next question
		// numQuestions := len(questions)
		// if curQuestionIndex == numQuestions-1 { // Qs are over
		// 	fmt.Println("Done!")
		// 	io.Copy(w, bytes.NewReader(nil))
		// 	return
		// }
		curQuestionIndex++
		quesScore := QuesScore{NextQues: questions[curQuestionIndex], CurScore: score}
		quesScore.NextQues.Correct = []string{strconv.Itoa(len(quesScore.NextQues.Correct))}

		// Marshal the comments to indented json.
		quesScoreData, err := json.MarshalIndent(quesScore, "", "    ")
		if err != nil {
			http.Error(w, fmt.Sprintf("Unable to marshal comments to json: %s", err), http.StatusInternalServerError)
			return
		}

		io.Copy(w, bytes.NewReader(quesScoreData))

	case "GET":
		fmt.Println("GET!")
		numQuestions := len(questions)
		if curQuestionIndex == numQuestions-1 { // Qs are over
			fmt.Println("Done!")
			io.Copy(w, bytes.NewReader(nil))
			return
		}
		quesScore := QuesScore{NextQues: questions[curQuestionIndex], CurScore: score}
		quesScore.NextQues.Correct = []string{strconv.Itoa(len(quesScore.NextQues.Correct))}
		// Marshal the comments to indented json.
		quesScoreData, err := json.MarshalIndent(quesScore, "", "    ")
		if err != nil {
			http.Error(w, fmt.Sprintf("Unable to marshal comments to json: %s", err), http.StatusInternalServerError)
			return
		}

		// stream the contents of the file to the response
		io.Copy(w, bytes.NewReader(quesScoreData))

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
	curQuestionIndex = 0
	// Initialize score
	score = Score{0.0, 0.0}

	toSend := &QuesScore{NextQues: questions[0], CurScore: score}
	fmt.Println(toSend.NextQues)
	fmt.Println(toSend.CurScore)
	res, err := json.Marshal(toSend)
	if err != nil {
		fmt.Sprintf("Could not Marshal QuesScore: %s", err)
	}
	fmt.Println(string(res))
	http.HandleFunc("/api/answers", handleSubmit)

	http.Handle("/", http.FileServer(http.Dir("./dist")))
	log.Println("Server started: http://localhost:" + port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
