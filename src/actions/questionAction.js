import * as types from '../constants/actionTypes';

// NOTE: To update the question.isFetching state
// The actual fetch happens in TODO
export function requestQuestion() {
  return {type: types.REQUEST_QUESTION};
}

export function receiveQuestion(json) {
  return {
    type: types.RECEIVE_QUESTION,
    question: JSON.parse(json)
  };
}
