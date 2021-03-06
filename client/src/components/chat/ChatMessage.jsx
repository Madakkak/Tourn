//
// ChatMessage.jsx
//
// Render an individual chat message in the Chat component.
//


import React, { PropTypes } from 'react';
import '../../../public/assets/styles/main.css';

const ChatMessage = (props) => (
  props.currentUser === props.sender ?
    <li className="transparent">
      <span className="testimonials-v4">
        <article className="testimonials-v4-in">
          <p className="pLeft"> {props.message}
            <span className="testimonials-author">{props.timeStamp}</span>
          </p>
        </article>
        <aside className="picRight">
          <img className="rounded-x" src={props.img} alt={props.sender} align="right"></img>
        </aside>
      </span>
    </li>
    :
    <li className="transparent">
      <span className="testimonials-v4">
        <article className="testimonials-v4-in">
          <p className="pRight"> {props.message}
            <span className="testimonials-author">{props.timeStamp}</span>
          </p>
        </article>
        <aside className="picLeft">
          <img className="rounded-x" src={props.img} alt={props.sender} align="left"></img>
        </aside>
      </span>
    </li>
);

ChatMessage.propTypes = {
  sender: PropTypes.string,
  timestamp: PropTypes.string,
  message: PropTypes.string,
  timeStamp: PropTypes.string,
  currentUser: PropTypes.string,
  img: PropTypes.string,
};

export default ChatMessage;
