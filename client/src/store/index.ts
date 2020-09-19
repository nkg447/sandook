import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { fileReducer } from '../reducer/file';

const reducers = combineReducers({
  file: fileReducer
});

export default createStore(reducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducers>;
