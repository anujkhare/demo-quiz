import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

let middleware = [thunk];

export default function configureStore(initialState) {
  return applyMiddleware(...middleware)(createStore)(rootReducer, initialState);
}
