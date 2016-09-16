//
// tournament.jsx
//
// Tournament reducer
// Delegates to sub-reducer functions for every nested property
// of the 'tournament' object in the state tree.
//

import { combineReducers } from 'redux-immutable';
import info from './info.jsx';
import chat from './chat.jsx';
import bracket from './bracket.jsx';
import roster from './roster.jsx';
import start from './start.jsx';
import invite from './invite.jsx';

// Tournament reducer function
const tournament = combineReducers({
  info,
  chat,
  bracket,
  roster,
  start,
  invite,
});

export default tournament;
