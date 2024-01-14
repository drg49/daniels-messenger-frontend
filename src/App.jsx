import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chatbox from './components/Chatbox';
import './App.css';

const socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pairedUser, setPairedUser] = useState(null);

  useEffect(() => {
    socket.on('paired', (pairedUserId) => {
      setPairedUser(pairedUserId);
      console.log(`You are paired with user ${pairedUserId}`);
    });

    socket.on('message', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    socket.on('disconnected', () => {
      setPairedUser(null);
      console.log('Your partner has disconnected');
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('message', inputValue);
    setMessages([...messages, { from: 'me', text: inputValue }]);
    setInputValue('');
  };

  return (
    <div>
      <h1 id="page-title">Stranger Chat</h1>
      <Chatbox
        messages={messages}
        pairedUser={pairedUser}
      />
      <div id="chat-input">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          disabled={!pairedUser || !inputValue.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
