//
// roster.jsx
//
// Roster Reducer
//

// Replace roster with an updated list of players
function handleUpdateRoster(state, newRoster) {
  console.log('Roster reducer: handleUpdateRoster');
  return state.set('roster', newRoster);
}

// Roster reducer function
export default function roster(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_ROSTER':
      return handleUpdateRoster(state, action.newRoster);
    default:
      return state;
  }
}
