//
// ChatContainer.js
//
// Container for the Chat component
//

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/action_creators.jsx';
import Chat from './chat/Chat.jsx';


function mapStateToProps(state) {
  return {
    chat: state.getIn(['tournament', 'chat']).toJS(),
    tournId: state.getIn(['tournament', 'info', 'tournId']),
    userName: state.getIn(['header', 'userData', 'userName']),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const ChatContainer = connect(mapStateToProps, mapDispatchToProps)(Chat);

export default ChatContainer;
