import * as action_question from './questionAction';
import * as action_selection from './selectionAction';
import * as action_score from './scoreAction';
import {setQuizStatus} from './envAction';

// TODO: This is a temp API, you should either receive
// the question and score separately, or change the reducers :P
function updateState(quesScore) {
  return dispatch => {
    // separate the json into score and question json
    // Call dispatch to set new state
    dispatch(action_selection.setSelection([]));
    dispatch(action_question.receiveQuestion(JSON.stringify(quesScore.question)));
    dispatch(action_score.receiveScore(JSON.stringify(quesScore.score)));
  };
}

// TODO: Do XMLHttpRequest without jQuery
export function httpRequest(url, data='', type='GET'){
  return new Promise( (resolve, reject) => {
    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      type: type,
      data: data,
      success: function(quesScore) {
        resolve(quesScore);
      },
      error: function(xhr, status, err) {
        reject(err);
      }
    });
  });
}

export function getQuestionScore() {
  return ((dispatch, getState) => {
    const {env} = getState();
    if (typeof env.token === 'undefined')
      return;
    httpRequest('/api/answers',
      JSON.stringify({token: env.token, type:'GET'}),
      'POST')
      .then(response => {
        console.log("GET");
        console.log(response);
        dispatch(setQuizStatus(response.Status));
        dispatch(updateState(response));
      })
      .catch(err => {
        console.log(err);
      });
  });
}

// This is here because it changes state all across
// it should read the current selection from the state,
// and send it to the API, get response, parse question
// and score from it, and then set the respective state
export default function submitAndFetch() {
  return (dispatch, getState) => {
    dispatch(action_question.requestQuestion());

    const {env, selection} = getState();
    if (typeof env.token === 'undefined')
      return;
    // FETCH THE QUESTOIN AND SCORE HERE!, using state
    return httpRequest('/api/answers',
      JSON.stringify({token: env.token, Data: selection}),
      'POST')
            .then(response => {
              console.log("THIS IS HERE!");
              console.log(response);
              dispatch(setQuizStatus(response.Status));
              dispatch(updateState(response));
            })
            .catch(err => {
              console.log(err);
            });
  };
}
