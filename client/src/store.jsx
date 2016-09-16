//
// Store.jsx
//

import { createStore, applyMiddleware } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from './reducers/root.jsx';
import state from '../../data/state.jsx';
import socketMiddleware from './actions/socket_middleware.jsx';
import { socket } from './utilities/socketContainer.jsx';

// Create an object for the default state tree

const initialState = fromJS(state);

console.log('INITIAL_STATE', state);
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(socketMiddleware(socket)),
  window.devToolsExtension && window.devToolsExtension()
);

export default store;
