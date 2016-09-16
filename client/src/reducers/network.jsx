//
// network.jsx
//
// Network reducer
//
// These action handlers will set the client state upon
// receiving certain server responses. Server sends down a complete
// state upon opening the app in a browser and determining logged in status.
// Also, selecting a different tournament from the drop-down menu will
// cause tournament state to change.

import { fromJS } from 'immutable';

// Set entire app state.
// Overwrites existing state tree with state sent from server
function handleSetState(state, newState) {
  console.log('handleSetState');
  console.log('handleSetState: initial =', state.toJS());
  const nextState = state.mergeDeep(fromJS(newState));
  console.log('handleSetState: next =', nextState.toJS());
  return nextState;
}

// Set user state.
// Overwrites existing user state tree with state sent from server
function handleSetUserState(state, newState) {
  console.log('handleSetUserState: initial =', state.toJS());
  const nextState = state.setIn(['header', 'userData'],
  state.getIn(['header', 'userData']).mergeDeep(fromJS(newState)));
  console.log('handleSetUserState: next =', nextState.toJS());
  return nextState;
}

// Set tourn state.
// Overwrites existing tourn state tree with state sent from server
function handleSetTournState(state, newState) {
  console.log('handleSetTournState', state, newState);
  console.log('handleSetTournState: initial =', state.toJS());
  // const nextState = state.set('tournament', state.get('tournament').mergeDeep(fromJS(newState)));
  const nextState = state.set('tournament', fromJS(newState));
  console.log('handleSetTournState: next =', nextState.toJS());
  return nextState;
}

// Network reducer function
export default function network(state = {}, action) {
  switch (action.type) {
    case 'SET_STATE':
      return handleSetState(state, action.state);
    case 'SET_USER_STATE':
      return handleSetUserState(state, action.state);
    case 'SET_TOURN_STATE':
      return handleSetTournState(state, action.state);
    default:
      return state;
  }
}
