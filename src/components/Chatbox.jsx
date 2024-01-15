import React, { useRef, useEffect } from "react";

const Chatbox = ({ messages, pairedUser, randomColor }) => {
  const waitMessage = "Please wait while we connect you with a stranger...";

  const chatBoxRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div id="chat-wrapper">
      <h4 id="wait-message">
        {pairedUser ? (
          <>
            You are paired with{" "}
            <span style={{ color: randomColor }}>{pairedUser}</span>
          </>
        ) : (
          waitMessage
        )}
      </h4>
      <ul id="chat-box" ref={chatBoxRef}>
        {messages.map((msg, index) => (
          <li key={index} className="message-container">
            <div className={`message ${msg.from}`}>
              <span className="message-text">{msg.text}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Chatbox;
