import React, { useState, useEffect, useRef } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis Root:_, une intelligence artificielle avancée. Comment puis-je vous aider aujourd'hui ?", sender: 'bot', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Référence pour la zone des messages
  const messagesContainerRef = useRef(null);
  
  // Effet pour l'animation des particules de code
  useEffect(() => {
    // Création de l'effet code en arrière-plan
    const messagesContainer = messagesContainerRef.current;
    if (!messagesContainer) return;
    
    const codeBackground = document.createElement('div');
    codeBackground.className = 'code-background';
    messagesContainer.appendChild(codeBackground);
    
    const codeSnippets = [
      'function analyzeInput(text) {',
      'return semanticEngine.process(text);',
      'const response = await neuralNetwork.generate();',
      'class NeuralPathway extends Synapse {',
      'const memory = new ShortTermMemory();',
      'async function processIntent(userInput) {',
      'if (sentiment.analyze(text) > 0.7) {',
      'for (let node of knowledgeGraph) {',
      'const entities = NER.extract(message);',
      'memory.store(conversation.context);',
      'return new Response(generated, context);'
    ];
    
    // Création des lignes de code en arrière-plan
    for (let i = 0; i < 15; i++) {
      const codeLine = document.createElement('div');
      codeLine.className = 'code-line';
      codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      codeLine.style.left = `${Math.random() * 100}%`;
      codeLine.style.animationDuration = `${10 + Math.random() * 20}s`;
      codeLine.style.animationDelay = `${Math.random() * 5}s`;
      codeBackground.appendChild(codeLine);
    }
    
    // Nettoyage de l'effet
    return () => {
      if (messagesContainer.contains(codeBackground)) {
        messagesContainer.removeChild(codeBackground);
      }
    };
  }, []);

  const sendMessageToClaude = async (message) => {
    try {
      setIsError(false);
      const response = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la communication avec l'API: ${response.status}`);
      }

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Erreur lors de la communication avec Claude:', error);
      setIsError(true);
      return "Je rencontre des difficultés momentanées à accéder à mes systèmes principaux. Pourriez-vous réessayer dans un instant ?";
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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    const dbUser = {
      sender: 'user',
      source: 'public',
      content: inputMessage,
      type: 'text',
      attachmentUrl: null
    };
    await saveMessageToDB(dbUser);

    const botResponse = await sendMessageToClaude(inputMessage);

    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);

    const dbBot = { ...dbUser, sender: 'bot', content: botResponse };
    await saveMessageToDB(dbBot);

    setIsTyping(false);
  };

  // Effet pour simuler les particules tech
  useEffect(() => {
    const createParticles = () => {
      const techParticles = document.createElement('div');
      techParticles.className = 'tech-particles';
      document.body.appendChild(techParticles);

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position aléatoire
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        
        // Animation
        particle.style.animation = `
          fadeInOut ${5 + Math.random() * 10}s infinite alternate,
          float ${10 + Math.random() * 20}s infinite alternate
        `;
        
        // Délai d'animation
        particle.style.animationDelay = `${Math.random() * 5}s`;
        
        // Taille aléatoire
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Opacité aléatoire
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        techParticles.appendChild(particle);
      }
      
      return () => {
        if (document.body.contains(techParticles)) {
          document.body.removeChild(techParticles);
        }
      };
    };
    
    const cleanup = createParticles();
    return cleanup;
  }, []);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Root:_</h2>
        <p>Intelligence Artificielle Avancée | v2.5.0</p>
        {isError && <div className="connection-error">Problème de connexion à l'API</div>}
      </div>

      <div className="messages-container" ref={messagesContainerRef}>
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
            <div className="message-content">
              <p>{message.text}</p>
              {/* Suppression des horodatages comme demandé */}
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
          placeholder="Saisissez votre message..."
          disabled={isTyping}
        />
        <button type="submit" disabled={isTyping || inputMessage.trim() === ''}>Envoyer</button>
      </form>

      <div className="chatbot-suggestions">
        <p>Suggestions:</p>
        <div className="suggestion-buttons">
          <button onClick={() => { setInputMessage("Qui es-tu ?"); setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100); }}>À propos de moi</button>
          <button onClick={() => { setInputMessage("Que peux-tu faire ?"); setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100); }}>Mes capacités</button>
          <button onClick={() => { setInputMessage("Comment fonctionnes-tu ?"); setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100); }}>Mon fonctionnement</button>
          <button onClick={() => { setInputMessage("Parle-moi de l'AGI"); setTimeout(() => handleSendMessage({ preventDefault: () => {} }), 100); }}>L'AGI</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;