import * as types from '../constants/actionTypes';

// the timeLeft and timeElapsed will be synced with the server as is,
// so we need them as separate properties.
const initialTime = {
  timeLeft: undefined,
  timeElapsed: undefined,
  startedAt: undefined
};

export default function time(state = initialTime, action) {
  switch (action.type) {
    case types.SET_TIME:
      return action.time;

    case types.START_TIME:
      return {
        ...state,
        startedAt: action.startedAt
      };
    default:
       return state;
  }
}
