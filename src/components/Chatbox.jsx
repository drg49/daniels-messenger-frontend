import React from "react";

const Chatbox = ({ messages, pairedUser }) => {
  const waitMessage = 'Please wait while we connect you with a stranger...';

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.from === 'me' ? 'You: ' : 'Stranger: '}
            {msg.text}
          </li>
        ))}
      </ul>
      <h4>
        {pairedUser ? `You are paired with user ${pairedUser}` : waitMessage}
      </h4>
    </div>
  )
};

export default Chatbox;
