//
// root.jsx
//
// Root app reducer
//

import { combineReducers } from 'redux-immutable';
import header from './header.jsx';
import tournament from './tournament.jsx';
import mode from './mode.jsx';
import network from './network.jsx';

// Root reducer function
const rootReducer = combineReducers({
  mode,
  header,
  tournament,
});

// Create a two-layer root reducer function that handles
// entire state tree udpates sent by the server in addition to actions
// targeting certain pieces of data.
export default (state, action) => rootReducer(network(state, action), action);
