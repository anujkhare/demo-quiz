import * as types from '../constants/actionTypes';

export function receiveScore(json) {
  return {
    type: types.RECEIVE_SCORE,
    score: JSON.parse(json)
  };
}
