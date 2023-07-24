import { combineReducers } from 'redux';
import { baseReducer, storeReducer } from './modules';

const reducer = combineReducers({
  base: baseReducer,
  store: storeReducer
});

export default reducer;
