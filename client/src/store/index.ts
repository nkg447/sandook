import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { fileReducer } from '../reducer/file';
import { systemReducer } from '../reducer/system';

const reducers = combineReducers({
  file: fileReducer,
  system: systemReducer
});

export default createStore(reducers, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducers>;
