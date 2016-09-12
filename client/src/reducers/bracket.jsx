//
// Bracket reducer
//

import { fromJS } from 'immutable';
import { getNextMatch } from '../utilities/bracket_helpers.jsx';

// Tourn organizer submits a player advance request to server.
// Client does nothing until server responds,
// so return unchanged state.
function handleSubmitAdvance(state) {
  console.log('Bracket reducer: handleSubmitAdvance: initial =', state);
  return state;
}

// Update tourn status
// Can be "Not Started", "In Progress", or "Concluded"
function handleUpdateStatus(state, status) {
  console.log('Bracket reducer: handleUpdateStatus: new status =', status);
  return state.set('tournStatus', status);
}

// Request to advance player OK'ed by server.
// Now update the client side to reflect bracket update by
// calculating the winner's next match placement and, if the match
// was the last, conclude the whole tournament.
function handleUpdateBracket(state, tournId, matchIndex, winner) {
  const newBracket = state.toJS();
  const nextMatch = getNextMatch(matchIndex, newBracket.bracketSize);

  console.log('Bracket reducer: handleUpdateBracket: properties', tournId, matchIndex, winner);
  console.log('Bracket reducer: handleUpdateBracket: nextMatch:', nextMatch);

  if (!nextMatch) {
    // Invalid match index. Do not change state!
    console.log('Bracket reducer: handleUpdateBracket: invalid match index!');
    return state;
  }

  newBracket.matches[matchIndex].winner = winner;
  newBracket.matches[matchIndex].status = 'Concluded';

  if (nextMatch === -1) {
    // Final match has concluded
    console.log('Bracket reducer: handleUpdateBracket: tournament has concluded!');
    newBracket.tournWinner = winner;
    newBracket.tournStatus = 'Concluded';
    return fromJS(newBracket);
  }

  if (!newBracket.matches[nextMatch].playerA) {
    // Fill player1 slot of next match
    console.log('Bracket reducer: handleUpdateBracket: filling player1 slot of next match!');
    newBracket.matches[nextMatch].playerA = winner;
  } else if (!newBracket.matches[nextMatch].playerB) {
    // Fill player2 slot of next match
    console.log('Bracket reducer: handleUpdateBracket: filling player2 slot of next match!');
    newBracket.matches[nextMatch].playerB = winner;
    newBracket.matches[nextMatch].status = 'In Progress';
  } else {
    // Should never happen
    console.log('Bracket reducer: handleUpdateBracket: error - match already full!');
  }

  return fromJS(newBracket);
}

// Update the bracket size
function handleUpdateSize(state, bracketSize) {
  return state.set('bracketSize', bracketSize);
}

// Bracket reducer function
export default function bracket(state = {}, action) {
  switch (action.type) {
    case 'SUBMIT_ADVANCE':
      return handleSubmitAdvance(state);
    case 'UPDATE_BRACKET':
      return handleUpdateBracket(state, action.tournId, action.matchIndex, action.winner);
    case 'UPDATE_TOURN_STATUS':
      return handleUpdateStatus(state, action.status);
    case 'UPDATE_BRACKET_SIZE':
      return handleUpdateSize(state.tournInfo, action.bracketSize);
    default:
      return state;
  }
}
