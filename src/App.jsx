import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chatbox from './components/Chatbox';
import './App.css';
import { generateUsername, getRandomColor } from './assets/data';

const socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pairedUser, setPairedUser] = useState(null);
  const [randomColor, setRandomColor] = useState('#000000');
  const [disconnectAlert, setDisconnectAlert] = useState('');

  useEffect(() => {
    // User has been paired:
    socket.on('paired', () => {
      setPairedUser(generateUsername());
      setRandomColor(getRandomColor());
    });

    // Handle incoming messages:
    socket.on('message', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    // Your partner has been disconnected:
    socket.on('disconnected', () => {
      setPairedUser(null);
      setDisconnectAlert('Your partner has disconnected');
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit('message', inputValue);
    setMessages([...messages, { from: 'me', text: inputValue }]);
    setInputValue('');
  };

  return (
    <main>
      <h1 id="page-title">Stranger Chat</h1>
      <Chatbox
        messages={messages}
        pairedUser={pairedUser}
        randomColor={randomColor}
        disconnectAlert={disconnectAlert}
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
          className='green-button'
        >
          Send
        </button>
      </div>
    </main>
  );
}

export default App;
