import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');

  const sendMessage = async () => {
    const res = await fetch('https://rootapi-production.up.railway.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    
    const data = await res.json();
    setReply(data.reply);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-4">
      <input
        className="border p-2 rounded w-80"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ton message"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Envoyer à Claude
      </button>
      {reply && <div className="mt-4 p-4 bg-white rounded shadow w-80">{reply}</div>}
    </div>
  );
}

export default App;
