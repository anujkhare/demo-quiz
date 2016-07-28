import * as types from '../constants/actionTypes';

const initialScoreJson = '{' +
'    "lastScore": 0, ' +
'    "totalScore": 0 ' +
'  }';

export default function score(state = JSON.parse(initialScoreJson), action) {
  switch (action.type) {
    case types.RECEIVE_SCORE:
      // the entire state has changed
      return Object.assign({}, action.score);
     default:
       return state;
  }
}

// TO test 
// {
// type:"RECEIVE_SCORE",
// score: JSON.parse('{"lastScore": 3, "totalScore": 2}')
// }
