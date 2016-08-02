import * as types from '../constants/actionTypes';
import {getQuestionScore, httpRequest} from './index';

export function setToken(token) {
  return {
    type: types.SET_TOKEN,
    token: token
  };
}

export function setQuizStatus(quizStatus) {
  return {
    type: types.SET_QUIZ_STATUS,
    quizStatus: quizStatus
  };
}

function setInProgress(inProgress) {
  return {
    type: types.SET_IN_PROGRESS,
    inProgress: inProgress
  };
}

function setFailed(failed) {
  return {
    type: types.SET_FAILED,
    failed: failed
  };
}

export function setServerError(serverError) {
  return {
    type: types.SET_SERVER_ERROR,
    serverError: serverError
  };
}

export function authFromServer() {
  return ((dispatch, getState) => {
    const {env} = getState();
    
    if (typeof env.token === 'undefined')
      return;

    dispatch(setInProgress(true));
    httpRequest('/api/auth',
                JSON.stringify({token: env.token}),
                'POST')
      .then(response => {
        dispatch(setQuizStatus(response.Status));
        dispatch(getQuestionScore());
        dispatch(setServerError(false));
        if (response.Status == 'InvalidToken')
          dispatch(setFailed(true));
      })
      .catch(err => {
        console.log(err);
        dispatch(setServerError(true));
      });

    dispatch(setInProgress(false));
  });
}
