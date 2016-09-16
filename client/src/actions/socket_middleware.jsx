//
// socket_middleware.jsx
//
// Remote action middleware functions to handle server socket IO events
//

export default socket => store => next => action => {
  // Make a request for a user with a given ID

  console.log('Socket middleware');
  console.log('store', store);

  const meta = action.meta;

  // If a meta property is detected, then send the event
  // to the server
  if (meta) {
    console.log('Meta detected - emitting remote action', action);
    socket.emit(meta.event, { to: meta.to, entry: meta.entry });
  }

  // Dispatch action to reducers
  return next(action);
};
