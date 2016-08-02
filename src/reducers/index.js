import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import {routerReducer} from 'react-router-redux';
import question from './questionReducer';
import score from './scoreReducer';
import selection from './selectionReducer';
import time from './timeReducer';
import env from './envReducer';

const rootReducer = combineReducers({
  question,
  score,
  selection,
  fuelSavings,
  time,
  env,
  routing: routerReducer
});

export default rootReducer;
