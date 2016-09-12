//
// Invite button reducer
//

// Set invites boolean to true or false
// This bool is evaluated to determine whether more
// players can be invited to the tourn.
function handleAllowInvites(state, allowInvites) {
  console.log('handleAllowInvites: new invite state =', allowInvites);
  return allowInvites;
}

// User's player invite has been submitted to server.
// Nothing to render in the meantime, so don't change state.
function handleSendInvite(state) {
  console.log('handleSendInvite');
  return state;
}

// Invite reducer function
export default function invite(state = {}, action) {
  switch (action.type) {
    case 'ALLOW_INVITES':
      return handleAllowInvites(state, action.invite);
    case 'SEND_INVITE':
      return handleSendInvite(state);
    default:
      return state;
  }
}
