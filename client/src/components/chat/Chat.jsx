//
// Chat.jsx
//
// Render the chat component. The chat will be updated
// with a message history, refreshed every time the tourn is selected
// or the user sends a new message.
//


import React, { PropTypes } from 'react';
import '../../../public/assets/styles/main.css';
import moment from 'moment';
import Message from './ChatMessage.jsx';

const Chat = (props) => {
  const updateMessage = (e) => {
    e.preventDefault();
    props.updateMessage(e.target.value);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    props.submitChat(props.tournId,
                     props.chat.message,
                     moment().format('ddd, h:mmA'));
  };

  return (<aside className="teaser col-1-3" style={{ order: 6 }}>
    <h4>CHAT</h4>
    <div className="list-padding">
      <ul>
        {props.chat.history.map((message, key) => {
          const messageElement = (<Message
            key={key}
            img={message.authorPic}
            sender={message.authorName}
            timestamp={message.timeStamp}
            message={message.message}
            currentUser={props.userName}
          />);

          if (messageElement) {
            return messageElement;
          }

          return '';
        })}
      </ul>
    </div>
    <form className="roster-chat-input-container" onSubmit={onSubmitClick}>
      <input
        onChange={updateMessage}
        type="text"
        placeholder="Enter message..."
        value={props.chat.message}
        className="roster-chat-input"
      />
      <button className="btn-alt">Submit</button>
    </form>
  </aside>);
};

Chat.propTypes = {
  submitChat: PropTypes.func,
  chat: PropTypes.object,
  tournId: PropTypes.string,
  userName: PropTypes.string,
};

export default Chat;
