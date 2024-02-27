import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chatbox from './components/Chatbox';
import './App.css';
import { generateUsername, getRandomColor } from './assets/data';

const socket = io(process.env.REACT_APP_API_URL);

function App() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [pairedUser, setPairedUser] = useState(null);
  const [randomColor, setRandomColor] = useState('#000000');
  const [disconnectAlert, setDisconnectAlert] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

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
      setDisconnectAlert('User has disconnected');
    });
  }, [messages]);

  useEffect(() => {
    // Your partner is typing:
    socket.on('typing', (isTyping) => {
      setIsTyping(isTyping);

      if (!isTyping) {
        // If not typing, clear the timeout
        clearTimeout(typingTimeout);
        setTypingTimeout(null);
      }
    });

    return () => {
      // Cleanup when component unmounts
      socket.off('typing');
      clearTimeout(typingTimeout);
    };
  }, [typingTimeout]);

  const sendMessage = () => {
    socket.emit('typing', false); // Notify that the user has stopped typing
    socket.emit('message', inputValue);
    setMessages([...messages, { from: 'me', text: inputValue }]);
    setInputValue('');
  };

  const handleTyping = () => {
    if (typingTimeout) {
      // If already typing, clear the existing timeout
      clearTimeout(typingTimeout);
    }

    // Notify that the user is typing after a short delay
    socket.emit('typing', true);

    // Set a new timeout to hide the notification after 3 seconds
    setTypingTimeout(setTimeout(() => {
      socket.emit('typing', false);
      setTypingTimeout(null);
    }, 3000));
  };

  return (
    <main>
      <h1 id="page-title">Daniel's Messenger</h1>
      <h5 id="created-by">Created by Daniel Gavin</h5>
      <Chatbox
        messages={messages}
        pairedUser={pairedUser}
        randomColor={randomColor}
        disconnectAlert={disconnectAlert}
      />
      <div
        className="typing-notification"
        style={{ visibility: isTyping ? 'visible' : 'hidden' }}
      >
        User is typing
      </div>
      <div id="chat-input">
        <textarea
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleTyping()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); // Prevents a newline from being added to the textarea
              sendMessage();
            }
          }}
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
