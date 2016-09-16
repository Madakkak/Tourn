//
// info.jsx
//
// Tournament info reducer
//

// Update tournament ID in the state tree
function handleUpdateId(state, tournId) {
  console.log('handleUpdateId: tournId =', tournId);
  return state.set('tournId', tournId);
}

// Update tournament type in the state tree
function handleUpdateType(state, tournType) {
  console.log('handleUpdateType: tournType =', tournType);
  return state.set('tournType', tournType);
}

// Update tournament name in the state tree
function handleUpdateName(state, tournName) {
  console.log('handleUpdateName: tournName =', tournName);
  return state.set('tournName', tournName);
}

// Update tournament rules in the state tree
function handleUpdateRules(state, rules) {
  console.log('handleUpdateRules: rules =', rules);
  return state.set('rules', rules);
}

// Tourn info reducer function
export default function info(state = {}, action) {
  switch (action.type) {
    case 'UPDATE_ID':
      return handleUpdateId(state, action.tournId);
    case 'UPDATE_TYPE':
      return handleUpdateType(state, action.tournType);
    case 'UPDATE_NAME':
      return handleUpdateName(state, action.tournName);
    case 'UPDATE_RULES':
      return handleUpdateRules(state, action.rules);
    default:
      return state;
  }
}
