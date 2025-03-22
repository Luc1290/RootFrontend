import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Référence pour le contenu du terminal
  const terminalContentRef = useRef(null);
  
  // Utilisation de useMemo pour éviter les recréations du tableau à chaque rendu
  const terminalLines = useMemo(() => [
    { prompt: 'root:_>', text: 'initializing_core_systems...' },
    { prompt: 'root:_>', text: 'cognitive_functions_online' },
    { prompt: 'user>', text: 'Quelles sont tes capacités ?' },
    { prompt: 'root:_>', text: 'Je suis Root:_, une intelligence artificielle évolutive conçue pour interagir, apprendre et résoudre des problèmes complexes en temps réel.' }
  ], []);
  
  // Animation de frappe de texte pour le terminal
  useEffect(() => {
    const animateTerminal = async () => {
      // Attendre que le DOM soit prêt
      if (!terminalContentRef.current) return;
      
      // Vider le contenu précédent pour éviter les doublons
      terminalContentRef.current.innerHTML = '';
      
      // Attendre un peu avant de commencer pour laisser le terminal apparaître
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Fonction pour animer une seule ligne
      const animateLine = async (lineData, index) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        lineElement.style.display = 'flex'; // Ajout de flex pour contrôler l'alignement
        lineElement.style.alignItems = 'flex-start'; // Alignement au début
        
        const promptElement = document.createElement('span');
        promptElement.className = 'terminal-prompt';
        promptElement.textContent = lineData.prompt;
        promptElement.style.flexShrink = '0'; // Empêche le prompt de rétrécir
        promptElement.style.marginRight = '8px';
        lineElement.appendChild(promptElement);
        
        // Ajouter un espace explicite entre le prompt et la réponse
        const spacerElement = document.createElement('span');
        spacerElement.textContent = ' ';
        spacerElement.style.flexShrink = '0';
        lineElement.appendChild(spacerElement);
        
        const responseElement = document.createElement('span');
        responseElement.className = 'terminal-response';
        responseElement.textContent = ''; // Commence vide
        responseElement.style.textAlign = 'left'; // Alignement à gauche explicite
        responseElement.style.flexGrow = '1'; // Permet à la réponse de prendre l'espace restant
        lineElement.appendChild(responseElement);
        
        // Le reste du code reste le même...
        
        // Initialement caché mais avec la hauteur correcte
        lineElement.style.opacity = 'left';
        
        // Ajouter au DOM
        terminalContentRef.current.appendChild(lineElement);
        
        // Forcer un reflow pour que les transitions fonctionnent
        void lineElement.offsetWidth;
        
        // Rendre visible
        lineElement.style.opacity = '1';
        
        // Attendre que l'élément soit visible
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Animer la frappe du texte
        for (let j = 0; j <= lineData.text.length; j++) {
          responseElement.textContent = lineData.text.substring(0, j);
          await new Promise(resolve => setTimeout(resolve, 30));
        }
        
        // Pause entre les lignes
        if (index < terminalLines.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      };
      
      // Animer chaque ligne séquentiellement
      for (let i = 0; i < terminalLines.length; i++) {
        await animateLine(terminalLines[i], i);
      }
    };
    
    // Exécuter l'animation uniquement lors du premier rendu
    const timeoutId = setTimeout(() => {
      animateTerminal();
    }, 500);
    
    // Nettoyer le timeout lors du démontage du composant
    return () => clearTimeout(timeoutId);
  }, [terminalLines]); // Ajout de terminalLines comme dépendance
  
  return (
    <div className="home-one-page">
      <section className="hero-section">
        <div className="hero-content">
        <div className="cyber-title">
  <h1 className="glitch-title" style={{ textTransform: 'none' }}>
    <span className="glitch-text" data-text="Root:">Root:</span>
    <span className="underscore-blink">_</span>
  </h1>
  <div className="neon-glow"></div>
</div>
          
          <div className="terminal-demo">
            <div className="terminal-header">
              <div className="terminal-button red"></div>
              <div className="terminal-button yellow"></div>
              <div className="terminal-button green"></div>
              <div className="terminal-title">root:_ @ system</div>
            </div>
            <div className="terminal-content" ref={terminalContentRef}>
              {/* Les lignes du terminal seront ajoutées dynamiquement par l'effet */}
            </div>
          </div>
        </div>        
        <div className="hero-background">
          {/* Les particules et la grille sont gérées par le CSS */}
        </div>
      </section>
      <section className="chat-invitation">
        <Link to="/chatbot" className="btn start-chat-btn">Commencer une conversation</Link>
      </section>
      
      <section className="features-section">
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3 className="feature-title">Traitement du langage avancé</h3>
          <p className="feature-description">
            Ma compréhension linguistique me permet de saisir les nuances, le contexte et les intentions derrière vos questions.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔄</div>
          <h3 className="feature-title">Apprentissage continu</h3>
          <p className="feature-description">
            J'apprends de chaque interaction pour améliorer mes réponses et approfondir ma compréhension du monde.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3 className="feature-title">Analyse approfondie</h3>
          <p className="feature-description">
            Je peux traiter et analyser des informations complexes pour offrir des perspectives pertinentes et nuancées.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🛠️</div>
          <h3 className="feature-title">Architecture évolutive</h3>
          <p className="feature-description">
            Ma structure modulaire me permet d'évoluer vers des capacités d'intelligence artificielle générale (AGI).
          </p>
        </div>
      </section>
      
      </div>
  );
};

export default Home;