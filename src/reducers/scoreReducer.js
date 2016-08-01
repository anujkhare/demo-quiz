import * as types from '../constants/actionTypes';

const initialScore = {
  lastScore: undefined,
  totalScore: undefined
};

export default function score(state = initialScore, action) {
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
