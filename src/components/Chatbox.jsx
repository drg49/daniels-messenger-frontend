import React from "react";

const Chatbox = ({ messages, pairedUser }) => {
  const waitMessage = 'Please wait while we connect you with a stranger...';

  return (
    <div>
      <h4>
        {pairedUser ? `You are paired with user ${pairedUser}` : waitMessage}
      </h4>
      <ul id="chat-box">
        {messages.map((msg, index) => (
          <li key={index} className="message-container">
            <div className={`message ${msg.from}`}>
              <span className="message-text">{msg.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
};

export default Chatbox;
