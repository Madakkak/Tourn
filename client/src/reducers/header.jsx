//
// Header reducer
//
// Any state changes to the header component are handled here
//

import { fromJS } from 'immutable';

// User's new tourn info has been submitted to server.
// Nothing to render in the meantime, so don't change state.
function handleSubmit(state) {
  console.log('Header reducer: handleSubmit');
  return state;
}

// Server sends new tourn ID and name in response to a successful
// new tourn creation. Update the client's tournament list
// with the new tourn info
function handleAddTourn(state, tournId, tournName) {
  console.log('Header reducer: handleAddTourn');
  const newUserTourns = state.getIn(['userData', 'userTourns']).toJS();

  newUserTourns.push({
    tournName,
    tournId,
  });

  return state.setIn(['userData', 'userTourns'], fromJS(newUserTourns));
}

// User's new tourn info has been submitted to server.
// Nothing to render in the meantime, so don't change state.
// TODO: Change the currently selected tourn name to the name
// of the newly selected one (even though the server hasn't
// given us the tournament state yet)
function handleSelectTourn(state) {
  console.log('Header reducer: handleSelectTourn');
  return state;
}

// Add a new alert to the user's alert list.
function handleAddAlert(state, alert) {
  console.log('Header reducer: handleAddAlert');
  const newAlerts = state.getIn(['userData', 'alerts']).toJS();
  const newAlert = alert;

  newAlerts.push(newAlert);

  return state.setIn(['userData', 'alerts'], fromJS(newAlerts));
}

// Find and delete the alert associted with the given ID
function handleDeleteAlert(state, alertId) {
  console.log('Header reducer: handleDeleteAlert');
  console.log('Header reducer: alertId =', alertId);

  // Optimistic next state:
  // Delete alertId obj from userData.alerts
  const alerts = state.getIn(['userData', 'alerts']).toJS();
  const delIndex = alerts.findIndex(alert => alert._id === alertId);

  alerts.splice(delIndex, 1);

  // If the alert wasn't found, return the original unchanged state
  return ~delIndex ? state.setIn(['userData', 'alerts'], fromJS(alerts)) :
                     state;
}

// User accepted an invite to a tourn.
// Update alert list and
function handleAcceptInvite(state, tournId, alertId) {
  console.log('Header reducer: handleAcceptInvite');
  console.log('Header reducer: tournId, alertId =', tournId, alertId);

  // Optimistic next state:
  // Add new tourn to userData.userTourns
  const alerts = state.getIn(['userData', 'alerts']).toJS();
  const tourns = state.getIn(['userData', 'userTourns']).toJS();
  const delIndex = alerts.findIndex(alert => alert._id === alertId);
  const newTourn = {
    tournName: alerts[delIndex].tournName,
    tournId,
  };

  tourns.splice(0, 0, newTourn);
  alerts.splice(delIndex, 1);

  return ~delIndex ? state.setIn(['userData', 'alerts'], fromJS(alerts))
                          .setIn(['userData', 'userTourns'], fromJS(tourns)) :
                     state.setIn(['userData', 'userTourns'], fromJS(tourns));
}

// Toggle tournament select drop-down list
function handleToggleSelect(state) {
  console.log('Header reducer: handleToggleSelect');
  const toggledTournList = !state.get('showTournList');
  return state.set('showTournList', toggledTournList);
}

// Toggle alerts drop-down list
function handleToggleAlerts(state) {
  console.log('Header reducer: handleToggleAlerts');
  const toggledAlertList = !state.get('showAlertList');
  return state.set('showAlertList', toggledAlertList);
}

// Header reducer function
export default function header(state, action) {
  switch (action.type) {
    case 'SUBMIT_NEW_TOURN':
      return handleSubmit(state);
    case 'ADD_NEW_TOURN':
      return handleAddTourn(state, action.tournId, action.tournName);
    case 'SELECT_TOURN':
      return handleSelectTourn(state);
    case 'ADD_ALERT':
      return handleAddAlert(state, action.alert);
    case 'DELETE_ALERT':
      return handleDeleteAlert(state, action.alertId);
    case 'ACCEPT_INVITE':
      return handleAcceptInvite(state, action.tournId, action.alertId);
    case 'TOGGLE_SELECT':
      return handleToggleSelect(state);
    case 'TOGGLE_ALERTS':
      return handleToggleAlerts(state);
    default:
      return state;
  }
}
