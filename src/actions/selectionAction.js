import * as types from '../constants/actionTypes';

// Must be given an array with uids!
export function setSelection(optionArr) {
  return {
    type: types.SET_SELECTION,
    selection: optionArr
  };
}

// toggle the given uid in selection
export function toggleSelectionOption(uid) {
  return {
    type: types.TOGGLE_SELECTION_UID,
    uid: uid
  };
}
