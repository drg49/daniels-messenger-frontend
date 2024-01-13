import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
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
    socket.emit('message', message);
    setMessages([...messages, { from: 'me', text: message }]);
    setMessage('');
  };

  return (
    <div>
      <h2>{pairedUser ? `You are paired with user ${pairedUser}` : 'Waiting for a partner'}</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.from === 'me' ? 'You: ' : 'Stranger: '}
            {msg.text}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} disabled={!pairedUser}>Send</button>
    </div>
  );
}

export default App;
