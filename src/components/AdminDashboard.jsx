import React, { useState, useEffect, useRef } from 'react';
import styles from './AdminDashboard.module.css';

const AdminDashboard = () => {
  // Détection si l'appareil est mobile
  const isMobile = window.innerWidth <= 768;
  
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
  const messagesContainerRef = useRef(null);

  // Fonction pour gérer l'authentification admin
  const handleAuth = async () => {
    try {
      const res = await fetch('https://rootbackend.fly.dev/api/verify-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });
  
      const result = await res.json();
      if (result.success) {
        setAuthenticated(true);
      } else {
        alert("Mot de passe incorrect. Accès refusé.");
      }
    } catch (err) {
      console.error("Erreur de vérification admin :", err);
      alert("Erreur de connexion.");
    }
  };
  

  const saveMessageToDB = async (msg) => {
    try {
      await fetch('https://rootbackend.fly.dev/api/messages', {
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

      const response = await fetch('https://rootbackend.fly.dev/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: JSON.stringify(formattedHistory) }),
      });

      if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error("Erreur Root:", error);
      setIsError(true);
      return "Problème de connexion au cerveau principal...";
    }
  };

  // Fonction de défilement améliorée
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'end', 
          inline: 'nearest' 
        });
      }
    }, 100);
  };

  // Défilement après chargement initial et après ajout de messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Défilement supplémentaire lorsque la réponse du bot est complète
  useEffect(() => {
    if (!isTyping && messages.length > 1 && messages[messages.length - 1].sender === 'bot') {
      scrollToBottom();
      setTimeout(scrollToBottom, 300);
      setTimeout(scrollToBottom, 1000);
    }
  }, [isTyping, messages]);

  // Gestion du clavier virtuel mobile (comme dans Chatbot)
  useEffect(() => {
      if (!isMobile || !authenticated) return;
  
      const input = document.querySelector(`.${styles.messageInputForm} input`);
      const initialHeight = window.innerHeight;
  
      const handleFocus = () => {
        setTimeout(() => {
          if (window.innerHeight < initialHeight * 0.8) {
            document.body.classList.add('keyboard-open');
          }
        }, 300);
      };
  
      const handleBlur = () => {
        document.body.classList.remove('keyboard-open');
        setTimeout(scrollToBottom, 300);
      };
  
      if (input) {
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);
      }
  
      return () => {
        if (input) {
          input.removeEventListener('focus', handleFocus);
          input.removeEventListener('blur', handleBlur);
        }
      };
  }, [authenticated, isMobile]);
  

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
    
    // Défiler immédiatement après l'envoi du message utilisateur
    scrollToBottom();

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
    
    // Défiler à nouveau après réception de la réponse
    scrollToBottom();
  };

  const logEvent = (source, content) => {
    setLogs(prev => [...prev, `[${source}] > ${content}`]);
  };

  const clearLogs = () => setLogs([]);

  // Effet pour s'assurer que la hauteur du conteneur de messages est correcte
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }

    // Détection du clavier virtuel pour mobile
    if (isMobile && authenticated) {
      const adjustHeight = () => {
        if (messagesContainerRef.current) {
          const viewHeight = window.innerHeight;
          const headerHeight = 100; // Estimation de la hauteur de l'en-tête
          const formHeight = 80;    // Estimation de la hauteur du formulaire
          const logsHeight = 240;   // Estimation de la hauteur des logs
          
          // Calculer la hauteur disponible
          const availableHeight = viewHeight - headerHeight - formHeight - logsHeight;
          
          // Définir la hauteur du conteneur de messages
          messagesContainerRef.current.style.height = `${Math.max(300, availableHeight)}px`;
        }
      };
      
      window.addEventListener('resize', adjustHeight);
      adjustHeight();
      
      return () => window.removeEventListener('resize', adjustHeight);
    }
  }, [authenticated, isMobile]); 

  if (!authenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.cyberTitle}>
          <h1 className={styles.glitchTitle} style={{ textTransform: 'none' }}>
            <span className={styles.glitchText} data-text="Root:">Root:</span>
            <span className={styles.underscoreBlink}>_</span>
            <span className={styles.adminTag}>ADMIN</span>
          </h1>
          <div className={styles.neonGlow}></div>
          {isError && <div className={styles.connectionError}>Erreur de connexion</div>}
        </div>

        <div className={styles.loginBox}>
          <h2>Accès Administrateur</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Mot de passe"
            className={styles.passwordInput}
          />
          <button onClick={handleAuth} className={styles.loginBtn}>Entrer</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.chatbotContainer}>    
    <a href="/messagedb" className={styles.dbLink}>📂 MessageDB</a>  
      <div className={styles.cyberTitle}>
        <h1 className={styles.glitchTitle} style={{ textTransform: 'none' }}>
          <span className={styles.glitchText} data-text="Root:">Root:</span>
          <span className={styles.underscoreBlink}>_</span>
          <span className={styles.adminTag}>ADMIN</span>
        </h1>
        <div className={styles.neonGlow}></div>
        {isError && <div className={styles.connectionError}>Erreur de connexion</div>}
      </div>

      <div className={styles.messagesContainer} ref={messagesContainerRef}>
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`${styles.message} ${m.sender === 'user' ? styles.userMessage : styles.botMessage}`}
          >
            <div className={styles.messageContent}>
              {m.sender === 'bot' ? (
                <div
                  className="formatted-response"
                  dangerouslySetInnerHTML={{ __html: m.text || '' }}
                />
              ) : (
                <p>{m.text}</p>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className={`${styles.message} ${styles.botMessage}`}>
            <div className={`${styles.messageContent} ${styles.typingIndicator}`}>
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className={styles.scrollAnchor} />
      </div>

      <form className={styles.messageInputForm} onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Commande ou question Root:_"
          disabled={isTyping}
          onFocus={() => isMobile && scrollToBottom()}
        />
        <button
          type="submit"
          disabled={isTyping || inputMessage.trim() === ''}
          className={styles.sendButton}
          aria-label="Envoyer"
        >
          {isMobile ? '➤' : <span className={styles.sendIcon}>&#10148;</span>}
        </button>
      </form>

      <div className={styles.logsSection}>
        <div className={styles.logsHeader}>
          <p>Logs Root:_</p>
          <button onClick={clearLogs} className={styles.clearLogsBtn}>Vider les logs</button>
        </div>
        <div className={styles.logsContainer}>
          {logs.map((log, index) => (
            <div key={index} className={styles.logEntry}>{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;