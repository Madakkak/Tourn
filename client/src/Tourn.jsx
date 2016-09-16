//
// Tourn.jsx
//
// This is the top-level app component where tourn's Redux store
// store is instatiated and the entire app is rendered.
// Additionally, all socket listeners for remote events
// are started here.
//


import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main.jsx';
import { Provider } from 'react-redux';
import store from './store.jsx';
import startListeners from './utilities/socketListeners.jsx';
import { socket } from './utilities/socketContainer.jsx';

// Kick off event listeners for server events
startListeners(socket);

// Instantiate Redux store and render the entire app
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);
