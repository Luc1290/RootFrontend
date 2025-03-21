import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis Root:_, l'assistant virtuel de Luc Parguel. Comment puis-je vous aider aujourd'hui ?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef(null);

  // Fonction pour envoyer un message à l'API Claude
  const sendMessageToAPI = async (message) => {
    try {
      setIsError(false);
      const response = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la communication avec l'API: ${response.status}`);
      }

      const data = await response.json();
      return data.reply; // Notez que le backend renvoie `reply` et non `response`
    } catch (error) {
      console.error('Erreur lors de la communication avec Claude:', error);
      setIsError(true);
      return "Désolé, je rencontre des difficultés à me connecter à mon cerveau. Pourriez-vous réessayer dans un instant ?";
    }
  };

  // Défilement automatique vers le bas lorsque de nouveaux messages apparaissent
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Gérer l'envoi du message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (inputMessage.trim() === '') return;
    
    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputMessage('');
    
    // Activer l'indicateur de frappe
    setIsTyping(true);
    
    try {
      // Envoyer le message à l'API et attendre la réponse
      const botResponse = await sendMessageToAPI(inputMessage);
      
      // Ajouter la réponse du bot
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erreur lors de la communication avec l\'API:', error);
      
      // Message d'erreur si la communication avec l'API échoue
      const errorMessage = {
        id: messages.length + 2,
        text: "Je suis désolé, j'ai rencontré un problème de connexion. Pourriez-vous réessayer?",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Formater l'heure du message
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Root:_</h2>
        <p>Assistant virtuel intelligent | En évolution vers une AGI</p>
        {isError && <div className="connection-error">Problème de connexion à l'API</div>}
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message bot-message">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
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
          placeholder="Tapez votre message ici..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || inputMessage.trim() === ''}>
          Envoyer
        </button>
      </form>
      
      <div className="chatbot-suggestions">
        <p>Suggestions:</p>
        <div className="suggestion-buttons">
          <button 
            onClick={() => {
              setInputMessage("Qui est Root:_ ?");
              setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
            }}
          >
            À propos de Root:_
          </button>
          <button 
            onClick={() => {
              setInputMessage("Que peux-tu faire ?");
              setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
            }}
          >
            Capacités
          </button>
          <button 
            onClick={() => {
              setInputMessage("Parle-moi de l'AGI");
              setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
            }}
          >
            L'AGI
          </button>
          <button 
            onClick={() => {
              setInputMessage("Qui est Luc Parguel ?");
              setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100);
            }}
          >
            À propos de Luc
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;