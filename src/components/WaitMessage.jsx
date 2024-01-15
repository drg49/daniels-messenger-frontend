import React from "react";

const WaitMessage = ({ pairedUser, randomColor, waitMessage }) => (
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
);

export default WaitMessage;
