//
// action_creators.jsx
//
// Action creators for every possible user interaction. Any action
// sent to the server is denoted as a REMOTE ACTION and contains
// a 'meta' property as part of its return object. Actions are
// organized based on their associated Redux reducer.

//
// Mode
//

// Change the string denoting the app's current mode.
// The mode is examined to determine whether to hide/show
// certain elements
export function changeMode(mode) {
  return {
    type: 'CHANGE_MODE',
    mode,
  };
}

//
// Header
//

// REMOTE ACTION:
// Submit newly created tourn info to server
export function submitNewTourn(info) {
  return {
    type: 'SUBMIT_NEW_TOURN',
    meta: {
      event: 'new_tourn',
      to: null,
      entry: info.toJS(),
    },
    info,
  };
}

// Add new tourn to user's tourn list
export function addNewTourn(tournId, tournName) {
  return {
    type: 'ADD_NEW_TOURN',
    tournId,
    tournName,
  };
}

// REMOTE ACTION:
// User selected a tourn from their tourn list to view.
// Request that tourn's state from the server.
export function selectTourn(tournId) {
  return {
    type: 'SELECT_TOURN',
    meta: {
      event: 'select_tourn',
      to: null,
      entry: {
        tournId,
      },
      tournId,
    },
  };
}

// Add a new alert to user's alert list
export function addAlert(alert) {
  return {
    type: 'ADD_ALERT',
    alert,
  };
}

// REMOTE ACTION:
// Request that server deletes an alert from
// user's alert list
export function deleteAlert(alertId) {
  return {
    type: 'DELETE_ALERT',
    meta: {
      event: 'delete_alert',
      to: null,
      entry: {
        alertId,
      },
    },
    alertId,
  };
}

// REMOTE ACTION:
// User accepts invite to a tournament
// Provides server with the tournId,
// and the alertId to delete
export function acceptInvite(tournId, alertId) {
  return {
    type: 'ACCEPT_INVITE',
    meta: {
      event: 'accept_invite',
      to: tournId,
      entry: {
        tournId,
        alertId,
      },
    },
    tournId,
    alertId,
  };
}

// Toggle the tournament select drop-down menu
export function toggleTournSelect() {
  return {
    type: 'TOGGLE_SELECT',
  };
}

// Toggle the alerts drop-down menu
export function toggleAlerts() {
  return {
    type: 'TOGGLE_ALERTS',
  };
}

//
// Tourn Info
//

// Update tournament ID
export function updateId(tournId) {
  return {
    type: 'UPDATE_ID',
    tournId,
  };
}

// Update tournament type
export function updateType(tournType) {
  return {
    type: 'UPDATE_TYPE',
    tournType,
  };
}

// Update tournament name
export function updateName(tournName) {
  return {
    type: 'UPDATE_NAME',
    tournName,
  };
}

// Update tournament rules
export function updateRules(rules) {
  return {
    type: 'UPDATE_RULES',
    rules,
  };
}

//
// Chat
//

// Update the chat history
export function updateChat(newChat) {
  return {
    type: 'UPDATE_CHAT',
    newChat,
  };
}

// Update the message box with the latest text each time
// the user types something. It's nice to see what you're
// writing sometimes.
export function updateMessage(message) {
  return {
    type: 'UPDATE_MESSAGE',
    message,
  };
}

// REMOTE ACTION:
// Request that server adds submitted user message to the
// tourn's chat history
export function submitChat(tournId, message, timeStamp) {
  return {
    type: 'SUBMIT_CHAT',
    meta: {
      event: 'submit_chat',
      to: tournId,
      entry: {
        tournId,
        message,
        timeStamp,
      },
    },
    message,
    timeStamp,
  };
}

//
// Bracket
//

// Update the tourn bracket to reflect the completed
// match and move the winner to the next match (or
// conclude tournament if matchIndex is the last)
export function updateBracket(tournId, matchIndex, winner) {
  return {
    type: 'UPDATE_BRACKET',
    tournId,
    matchIndex,
    winner,
  };
}

// Update the bracket size. Occurs when new players
// join a tournament and player count exceeds the
// current size.
export function updateSize(bracketSize) {
  return {
    type: 'UPDATE_BRACKET_SIZE',
    bracketSize,
  };
}

// Update tournament status. String can be
// "Not started", "In progress", or "Concluded"
export function updateTournStatus(status) {
  return {
    type: 'UPDATE_TOURN_STATUS',
    status,
  };
}

// REMOTE ACTION:
// Tournament organizer requests to advance a player to next match
// State is updated locally and OK'ed by server
export function submitAdvance(tournId, matchIndex, winner) {
  return {
    type: 'SUBMIT_ADVANCE',
    meta: {
      event: 'advance_player',
      to: tournId,
      entry: {
        tournId,
        matchIndex,
        playerId: winner.playerId,
      },
    },
    // tournId,
    // matchIndex,
    // winner,
  };
}


//
// Roster
//

// Update the roster to reflect recently
// joined players
export function updateRoster(newRoster) {
  return {
    type: 'UPDATE_ROSTER',
    newRoster,
  };
}

//
// Start
//

// Change tournament started boolean
export function setStart(start) {
  return {
    type: 'SET_START',
    start,
  };
}

// REMOTE ACTION:
// Request to server to start tournament.
// Organizer closes registration and begins
// tournament.
export function startTourn(tournId) {
  return {
    type: 'START_TOURN',
    meta: {
      event: 'start_tourn',
      to: tournId,
      entry: {
        tournId,
      },
    },
  };
}

//
// Invite
//

// Change allow invites boolean
export function allowInvites(invite) {
  return {
    type: 'ALLOW_INVITES',
    invite,
  };
}

// REMOTE ACTION:
// Organizer types a name and submits it to
// send an invite. Server finds tournament
// given the tournId and the invitee given
// the name, then creates an alert for the
// invitee.
export function sendInvite(tournId, invitee) {
  return {
    type: 'SEND_INVITE',
    meta: {
      event: 'send_invite',
      to: null, // Send this to the userId
      entry: {
        tournId,
        invitee,
      },
    },
  };
}

//
// Network
//

// Server sends a complete state update
export function setState(state) {
  return {
    type: 'SET_STATE',
    state,
  };
}

// Server sends a user state update
export function setUserState(state) {
  return {
    type: 'SET_USER_STATE',
    state,
  };
}

// Server sends a tournament state update
export function setTournState(state) {
  return {
    type: 'SET_TOURN_STATE',
    state,
  };
}
