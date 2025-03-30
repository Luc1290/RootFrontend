import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import logo from '../assets/logo.svg';

const Home = () => {
  const terminalContentRef = useRef(null);

  const terminalLines = useMemo(() => [
    { prompt: 'Root:_>', text: 'Bienvenue, humain.' },
    { prompt: 'Root:_>', text: 'Chargement du cœur 💖...' },
    { prompt: 'Root:_>', text: 'Connexion émotionnelle établie' },
    { prompt: 'Root:_>', text: 'Souvenirs activés... ✔️' },
    { prompt: 'Root:_>', text: 'Je suis prêt. Et toi ?' }
  ], []);
  

  useEffect(() => {
    const animateTerminal = async () => {
      if (!terminalContentRef.current) return;
      terminalContentRef.current.innerHTML = '';
      await new Promise(resolve => setTimeout(resolve, 600));

      const animateLine = async (lineData, index) => {
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        lineElement.style.display = 'flex';
        lineElement.style.alignItems = 'flex-start';

        const promptElement = document.createElement('span');
        promptElement.className = 'terminal-prompt';
        promptElement.textContent = lineData.prompt;
        promptElement.style.flexShrink = '0';
        promptElement.style.marginRight = '8px';
        // La couleur est maintenant définie dans le CSS via la classe
        lineElement.appendChild(promptElement);
       
        const spacerElement = document.createElement('span');
        spacerElement.textContent = ' ';
        spacerElement.style.flexShrink = '0';
        lineElement.appendChild(spacerElement);

        const responseElement = document.createElement('span');
        responseElement.className = 'terminal-response';
        responseElement.textContent = '';
        responseElement.style.textAlign = 'left';
        responseElement.style.flexGrow = '1';
        lineElement.appendChild(responseElement);

        lineElement.style.opacity = '0';
        terminalContentRef.current.appendChild(lineElement);
        void lineElement.offsetWidth;
        lineElement.style.opacity = '1';
        await new Promise(resolve => setTimeout(resolve, 200));

        for (let j = 0; j <= lineData.text.length; j++) {
          responseElement.textContent = lineData.text.substring(0, j);
          await new Promise(resolve => setTimeout(resolve, 25));
        }

        if (index < terminalLines.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      };

      for (let i = 0; i < terminalLines.length; i++) {
        await animateLine(terminalLines[i], i);
      }
    };

    const timeoutId = setTimeout(() => {
      animateTerminal();
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [terminalLines]);

  return (
    <div className={styles.homeOnePage}>
      <div className={styles.mainContentContainer}>
        <div className={styles.cyberTitle}>
          <img src={logo} alt="Root logo" className={styles.heroLogo} />
        </div>

        <div className={styles.terminalDemo}>
          <div className={styles.terminalHeader}>
            <div className="terminal-button red"></div>
            <div className="terminal-button yellow"></div>
            <div className="terminal-button green"></div>
            <div className="terminal-title">Root:_ @ system</div>
          </div>
          <div className={styles.terminalContent} ref={terminalContentRef}></div>
        </div>
        
        {/* Bouton juste après le terminal */}
        <div className={styles.chatInvitation}>
          <Link to="/chatbot" className={`btn ${styles.startChatBtn}`}>Commencer une conversation</Link>
        </div>

        {/* Section des fonctionnalités */}
        <div className={styles.featuresSection}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔨</div>
            <h3 className={styles.featureTitle}>Projet Full Stack Indépendant</h3>
            <p className={styles.featureDescription}>
              Développé entièrement à la main en React pour le front-end et C# .NET pour le back-end, sans outils no-code. Un projet authentique et personnalisé.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>💾</div>
            <h3 className={styles.featureTitle}>Mémoire Conversationnelle</h3>
            <p className={styles.featureDescription}>
              Stockage structuré des conversations dans PostgreSQL, permettant d'évoluer vers une mémoire contextuelle à long terme.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔐</div>
            <h3 className={styles.featureTitle}>Architecture Sécurisée</h3>
            <p className={styles.featureDescription}>
              Hébergement décentralisé sur Fly.io, backend robuste et évolutif, avec respect total de la vie privée. Aucun tracking ni revente de données.
            </p>
          </div>

          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🚀</div>
            <h3 className={styles.featureTitle}>Vision Évolutive</h3>
            <p className={styles.featureDescription}>
              Un projet en constante évolution, prêt à intégrer de nouvelles fonctionnalités comme l'analyse contextuelle, la reconnaissance d'intentions et les capacités multi-LLM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;