import { combineReducers, createStore } from 'redux';

import { fileReducer } from '../reducer/file';

const reducers = combineReducers({
  fileState: fileReducer
});

export default createStore(reducers);
