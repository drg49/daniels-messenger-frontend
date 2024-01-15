import React from "react";

const WaitMessage = ({ pairedUser, randomColor, waitMessage }) => (
  <h4 id="wait-message">
    {pairedUser ? (
      <>
        <div>
          You are paired with{" "}
          <span style={{ color: randomColor }}>{pairedUser}</span>
        </div>
        <button id="leave-chat" onClick={() => window.location.reload()}>
          Leave chat
        </button>
      </>
    ) : (
      waitMessage
    )}
  </h4>
);

export default WaitMessage;
