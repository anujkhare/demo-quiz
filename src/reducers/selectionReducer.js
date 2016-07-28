import * as types from '../constants/actionTypes';

// selection must just be an array of UIDs.
const initialSelection = [];

export default function selection(state = initialSelection, action) {
  switch (action.type) {
    case types.TOGGLE_SELECTION_UID: {
      let ind = state.indexOf(action.uid);
      if (ind == -1) {  // not present in the selection
        return [
          ...state,
          action.uid
        ];
      }

      return [
        ...state.slice(0, ind),
        ...state.slice(ind + 1)
      ];
    }

    case types.SET_SELECTION:
      return action.selection;

    default:
       return state;
  }
}

// {
// type: "SET_SELECTION",
// selection: ["5", "3"]
// }
//
// 
