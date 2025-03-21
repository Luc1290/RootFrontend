import React, { useState, useEffect, useRef } from 'react';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Bienvenue Luc. Interface AGI Root:_ activée.", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef(null);

  const CORRECT_PASSWORD = 'rootadmin'; // ✨ Tu peux changer ça facilement

  const handleAuth = () => {
    if (passwordInput === CORRECT_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Mot de passe incorrect. Accès refusé.");
    }
  };

  const sendMessageToAPI = async (message) => {
    try {
      setIsError(false);
      const response = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `[ADMIN MODE - LUC]\n${message}` }),
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
    setInputMessage('');
    setIsTyping(true);

    const botReply = await sendMessageToAPI(inputMessage);
    const botMessage = {
      id: messages.length + 2,
      text: botReply,
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
        <button onClick={handleAuth} className="btn">Entrer</button>
      </div>
    );
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Root:_ / Admin</h2>
        <p>Mode personnel activé</p>
        {isError && <div className="connection-error">Erreur de connexion</div>}
      </div>

      <div className="messages-container">
        {messages.map((m) => (
          <div key={m.id} className={`message ${m.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
              <p>{m.text}</p>
              <span className="message-time">{formatTime(m.timestamp)}</span>
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
    </div>
  );
};

export default Admin;
