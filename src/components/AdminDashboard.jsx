import React, { useState, useEffect, useRef } from 'react';
import AnimatedBackground from './AnimatedBackground.jsx'; // adapte le chemin si besoin


const AdminDashboard = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue Luc. Interface AGI Root:_ activée.", sender: 'bot', timestamp: new Date() }
  ]);
  const [logs, setLogs] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null); // tout en haut avec les autres


  const CORRECT_PASSWORD = 'rootadmin';

  const handleAuth = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Mot de passe incorrect. Accès refusé.");
    }
  };

  const saveMessageToDB = async (msg) => {
    try {
      await fetch('https://rootapi-production.up.railway.app/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
    } catch (err) {
      console.error("Erreur enregistrement message dans PostgreSQL:", err);
    }
  };

  const sendMessageToAPI = async (newMessage) => {
    try {
      setIsError(false);

      const formattedHistory = messages
        .filter((m) => m.sender === 'user' || m.sender === 'bot')
        .map((m) => {
          const role = m.sender === 'user' ? 'user' : 'assistant';
          return { role, content: m.text };
        });
      formattedHistory.push({ role: 'user', content: newMessage });

      const response = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: JSON.stringify(formattedHistory) }),
      });

      if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Erreur Claude:", error);
      setIsError(true);
      return "Problème de connexion au cerveau principal...";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    logEvent("USER", inputMessage);
    setInputMessage('');
    setIsTyping(true);

    const dbUser = {
      sender: 'user',
      source: 'admin',
      content: inputMessage,
      type: 'text',
      attachmentUrl: null
    };
    await saveMessageToDB(dbUser);

    const botReply = await sendMessageToAPI(inputMessage);

    const botMessage = {
      id: messages.length + 2,
      text: botReply,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    logEvent("BOT", botReply);

    const dbBot = { ...dbUser, sender: 'bot', content: botReply };
    await saveMessageToDB(dbBot);

    setIsTyping(false);
  };

  const logEvent = (source, content) => {
    setLogs(prev => [...prev, `[${source}] > ${content}`]);
  };

  const clearLogs = () => setLogs([]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!authenticated) {
    return (
      <div className="page-container text-center">
        <h2>Accès Administrateur</h2>
         <input
               type="password"
               value={passwordInput}
               onChange={(e) => setPasswordInput(e.target.value)}
               placeholder="Mot de passe"
         />
        <button onClick={handleAuth} className="start-chat-btn">Entrer</button>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Root:_ / Admin</h2>
        <p>Mode personnel + console de logs</p>
        {isError && <div className="connection-error">Erreur de connexion</div>}
      </div>

      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
              <p>{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message bot-message">
            <div className="message-content typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Commande ou question Root:_"
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || inputMessage.trim() === ''}>Envoyer</button>
      </form>

      <div className="chatbot-suggestions">
        <p>Logs Root:_</p>
        <div style={{ backgroundColor: '#222', color: '#0f0', padding: '1rem', borderRadius: '8px', maxHeight: '200px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '0.9rem' }}>
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>
        <button onClick={clearLogs} className="btn" style={{ marginTop: '1rem' }}>Vider les logs</button>
      </div>
    </div>
  );
};

export default AdminDashboard;