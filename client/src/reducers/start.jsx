//
// start.jsx
//
// Start button reducer
//

// Set tourn started boolean to indicate
// whether the tournament is in progress
// and if players can still join
function handleSetStart(state, started) {
  console.log('Start reducer: handleSetStart: new start state =', started);
  return started;
}

// User sent start tourn request to server.
// Nothing to render in the meantime, so don't change state.
function handleStartTourn(state) {
  console.log('Start reducer: handleStartTourn');
  return state;
}

// Start reducer function
export default function start(state = {}, action) {
  switch (action.type) {
    case 'SET_START':
      return handleSetStart(state, action.start);
    case 'START_TOURN':
      return handleStartTourn(state);
    default:
      return state;
  }
}
