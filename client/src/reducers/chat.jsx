//
// chat.jsx
//
// Chat reducer
//
import { fromJS } from 'immutable';

// User's new chat message has been submitted to server.
// Reset the new message box to be empty
function handleSubmitChat(state) {
  console.log('Chat reducer: handleSubmitChat');
  return state.set('message', '');
}

// Update the message box with the latest text each time
// the user types something. It's nice to see what you're
// writing sometimes.
function handleMessageUpdate(state, message) {
  console.log('Chat reducer: handleMessageUpdate');
  console.log('Chat reducer: message =', message);
  return state.set('message', message);
}

// Update the entire chat history by overwriting the old one
// with the one server sends
function handleChatUpdate(state, message) {
  console.log('Chat reducer: handleChatUpdate', message);
  const newChatHist = state.get('history').toJS();
  newChatHist.push(message);
  return state.set('history', fromJS(newChatHist));
}

// Chat reducer function
export default function chat(state = {}, action) {
  switch (action.type) {
    case 'SUBMIT_CHAT':
      return handleSubmitChat(state);
    case 'UPDATE_MESSAGE':
      return handleMessageUpdate(state, action.message);
    case 'UPDATE_CHAT':
      return handleChatUpdate(state, action.newChat);
    default:
      return state;
  }
}

