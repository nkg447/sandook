import { combineReducers, createStore } from 'redux';

import { fileReducer } from '../reducer/file';

const reducers = combineReducers({
  file: fileReducer
});

export default createStore(reducers);

export type RootState = ReturnType<typeof reducers>;
