import * as types from '../constants/actionTypes';
// import calculator from '../utils/fuelSavingsCalculator';
// import dateHelper from '../utils/dateHelper';
// import objectAssign from 'object-assign';

const initialQuestionJson = '{ ' +
'    "id": "demo-2", ' +
'    "isFetching": false, ' +
'    "str": "Which among the following were originally developed at Google?", ' +
'    "correct": ["2"], ' +
'    "opt": [{ ' +
'      "uid": "demo-2a", ' +
'      "str": "Go programming language" ' +
'    }, { ' +
'      "uid": "demo-2b", ' +
'      "str": "Ruby" ' +
'    }, { ' +
'      "uid": "demo-2c", ' +
'      "str": "Angular" ' +
'    }, { ' +
'      "uid": "demo-2d", ' +
'      "str": "Rust" ' +
'    }], ' +
'    "positive": 5, ' +
'    "negative": 5, ' +
'    "tags": ["easy", "demo"] ' +
'  }';

export default function question(state = JSON.parse(initialQuestionJson), action) {
  switch (action.type) {
    case types.REQUEST_QUESTION:
      return Object.assign({}, state, {
        isFetching: true
      });
    case types.RECEIVE_QUESTION:
      // the entire state has changed
      return Object.assign({}, action.question, {
        isFetching: false
      });
     default:
       return state;
  }
}
        

// const initialQuestion = '{' +
// '  "question": { ' +
// '    "id": "demo-2", ' +
// '    "str": "Which among the following were originally developed at Google?", ' +
// '    "correct": ["2"], ' +
// '    "opt": [{ ' +
// '      "uid": "demo-2a", ' +
// '      "str": "Go programming language" ' +
// '    }, { ' +
// '      "uid": "demo-2b", ' +
// '      "str": "Ruby" ' +
// '    }, { ' +
// '      "uid": "demo-2c", ' +
// '      "str": "Angular" ' +
// '    }, { ' +
// '      "uid": "demo-2d", ' +
// '      "str": "Rust" ' +
// '    }], ' +
// '    "positive": 5, ' +
// '    "negative": 5, ' +
// '    "tags": ["easy", "demo"] ' +
// '  }, ' +
// '  "score": { ' +
// '    "lastScore": 0, ' +
// '    "totalScore": 0 ' +
// '  } ' +
// '}';
//
// TO TEST LATER:
// {
// type: "RECEIVE_QUESTION",
// question: JSON.parse('{"id": "demo-2", "str": "Which among the following were originally developed at Google?", "correct": ["demo-2a","demo-2c"], "opt": [ {"uid": "demo-2a","str": "Go programming language"}, {"uid": "demo-2b","str": "Ruby"}, {"uid": "demo-2c","str": "Angular"}, {"uid": "demo-2d","str": "Rust"} ], "positive": 5, "negative": 5, "tags": ["easy","demo"] }')
// }
