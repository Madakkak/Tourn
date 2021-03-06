//
// RulesContainer.jsx
//

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators.jsx';
import Rules from './rules/Rules.jsx';


function mapStateToProps(state) {
  return {
    mode: state.get('mode'),
    tournOrganizer: state.getIn(['tournament', 'info', 'tournOrganizer']),
    rules: state.getIn(['tournament', 'info', 'rules']),
    tournType: state.getIn(['tournament', 'info', 'tournType']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const RulesContainer = connect(mapStateToProps, mapDispatchToProps)(Rules);

export default RulesContainer;
