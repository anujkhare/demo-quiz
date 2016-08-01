import * as types from '../constants/actionTypes';
import {httpRequest} from './index';

// time must have {timeLeft, timeElapsed}
export function setTime(time) {
  console.log(time);
  return {
    type: types.SET_TIME,
    time
  };
}

export function startTime() {
  return {
    type: types.START_TIME,
    startedAt: new Date().getTime()
  };
}

export function getTimeServer() {
  return ((dispatch) => {
    httpRequest('http://localhost:3002/api/time')
      .then(response => {
        console.log("Hey there!");
        console.log(response);
        dispatch(setTime({timeLeft: response.TimeLeft,
                          timeElapsed: response.TimeElapsed,
                          startedAt: new Date().getTime()
                          }));
      })
      .catch(err => console.log(err));
  });
}

// export function stopTime() {
//   return {
//     type: types.STOP_TIME
//   };
// }
