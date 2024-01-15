import React, { useRef, useEffect } from "react";
import WaitMessage from "./WaitMessage";

const Chatbox = ({ messages, pairedUser, randomColor, disconnectAlert }) => {
  const waitMessage = "Please wait while we connect you with a stranger...";

  const chatBoxRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when messages change
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [messages]);

  return (
    <div id="chat-wrapper">
      <p id="disconnect">{disconnectAlert}</p>
      {disconnectAlert ? (
        <div id="find-a-stranger">
          <button
            className="green-button"
            onClick={() => window.location.reload()}
          >
            Find a stranger
          </button>
        </div>
      ) : (
        <WaitMessage
          pairedUser={pairedUser}
          randomColor={randomColor}
          waitMessage={waitMessage}
        />
      )}
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
