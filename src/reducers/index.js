import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import question from './questionReducer';
import score from './scoreReducer';
import selection from './selectionReducer';

const rootReducer = combineReducers({
  question,
  score,
  selection,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;
