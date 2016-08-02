import * as types from '../constants/actionTypes';

const initialEnv = {
  token: undefined,
  quizStatus: "InvalidToken",
  inProgress: false,
  failed: false,
  serverError: false
};

export default function env(state = initialEnv, action) {
  switch (action.type) {
    case types.SET_TOKEN:
      return Object.assign({}, state, {
        token: action.token
      });

    case types.SET_QUIZ_STATUS:
      console.log(action.quizStatus);
      return Object.assign({}, state, {
        quizStatus: action.quizStatus
      });

    case types.SET_IN_PROGRESS:
      return Object.assign({}, state, {
        inProgress: action.inProgress
      });

    case types.SET_FAILED:
      return Object.assign({}, state, {
        failed: action.failed
      });

    case types.SET_SERVER_ERROR:
      return Object.assign({}, state, {
        serverError: action.serverError
      });

    default:
      return state;
  }
}
        

