//
// Mode reducer
//

// Change the app's mode string
function handleChangeMode(state, newMode) {
  console.log('Mode reducer: handleChangeMode');
  console.log('Mode reducer: new mode =', newMode);
  return newMode;
}

// Mode reducer function
export default function mode(state = {}, action) {
  switch (action.type) {
    case 'CHANGE_MODE':
      return handleChangeMode(state, action.mode);
    default:
      return state;
  }
}
