import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import reduxLogger from 'redux-logger';
import reduxThunk from 'redux-thunk';

const middlewares = [reduxThunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(reduxLogger);
}

const store = createStore(reducer, applyMiddleware(...middlewares));

export default store;
