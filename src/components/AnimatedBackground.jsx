import React, { useEffect } from 'react';

const AnimatedBackground = () => {
  // Effet pour créer les particules et l'animation du code
  useEffect(() => {
    // Fonction pour créer les particules
    const createParticles = () => {
      // Suppression des particules existantes si présentes
      const existingParticles = document.querySelector('.tech-particles');
      if (existingParticles) {
        document.body.removeChild(existingParticles);
      }
      
      // Création du conteneur de particules
      const particles = document.createElement('div');
      particles.className = 'tech-particles';
      
      // Génération des particules
      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        // Taille aléatoire
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Animation
        particle.animate(
          [
            { transform: `translate(0, 0)` },
            { transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)` }
          ],
          {
            duration: 5000 + Math.random() * 10000,
            direction: 'alternate',
            iterations: Infinity,
            easing: 'ease-in-out'
          }
        );
        
        particles.appendChild(particle);
      }
      
      document.body.appendChild(particles);
    };
    
    // Fonction pour créer l'animation du code en arrière-plan
    const createCodeBackground = () => {
      // Suppression de l'arrière-plan existant si présent
      const existingCodeBg = document.querySelector('.code-background-global');
      if (existingCodeBg) {
        document.body.removeChild(existingCodeBg);
      }
      
      // Création du conteneur pour l'arrière-plan de code
      const codeBackground = document.createElement('div');
      codeBackground.className = 'code-background-global';
      codeBackground.style.position = 'fixed';
      codeBackground.style.top = '0';
      codeBackground.style.left = '0';
      codeBackground.style.width = '100%';
      codeBackground.style.height = '100%';
      codeBackground.style.overflow = 'hidden';
      codeBackground.style.opacity = '0.25';
      codeBackground.style.zIndex = '-2';
      codeBackground.style.pointerEvents = 'none';
      
      const codeSnippets = [
        'const agent = new AGI("Root");',
        'if (input === "question") respond();',
        'fetch("/api/chat")',
        'try { connect(); } catch(e) {}',
        'while(true) { process(); }',
        'async function getResponse() { ... }',
        'console.log("Boot sequence complete");',
        '[INFO] Connected to LLM instance',
        '<Chatbot status="active" />',
        'def analyse(data): return result',
        'System.Diagnostics.Debug.WriteLine("OK");',
        'root_ai.listen(input);',
        '// Initialising Root Core',
        '# include <root_ai.h>',
        'public class RootAgent : AI {}',
        'npm start --silent',
        'pip install root-ai',
        'export ROOT_MODE=prod',
        'Connection established at port 443',
      ];
      
      // Création des lignes de code
      for (let i = 0; i < 80; i++) {
        const codeLine = document.createElement('div');
        codeLine.className = 'code-line';
        codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeLine.style.position = 'absolute';
        codeLine.style.fontFamily = 'var(--font-mono, monospace)';
        codeLine.style.fontSize = '0.65rem';
        codeLine.style.color = 'var(--primary-color, #0ce3ff)';
        codeLine.style.whiteSpace = 'nowrap';
        codeLine.style.left = `${Math.random() * 100}%`;
        
        // Animation
        codeLine.style.animation = 'code-scroll linear infinite';
        codeLine.style.animationDuration = `${8 + Math.random() * 10}s`;
        codeLine.style.animationDelay = `${Math.random() * 5}s`;
        
        codeBackground.appendChild(codeLine);
      }
      
      // Ajout du style CSS pour l'animation si nécessaire
      if (!document.getElementById('code-animation-style')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'code-animation-style';
        styleElement.textContent = `
          @keyframes code-scroll {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100vh); }
          }
        `;
        document.head.appendChild(styleElement);
      }
      
      document.body.appendChild(codeBackground);
    };
    
    // Création du fond dégradé bleu foncé
    const createDarkBackground = () => {
      // Suppression du fond existant si présent
      if (document.body.style.background) {
        document.body.style.background = '';
      }
      
      // Modification du style du body
      document.body.style.background = 'var(--dark-bg, #0a0e17)';
      document.body.style.backgroundImage = 'radial-gradient(circle at 30% 20%, rgba(12, 227, 255, 0.05), transparent 25%), radial-gradient(circle at 70% 60%, rgba(86, 3, 173, 0.05), transparent 25%)';
      document.body.style.backgroundAttachment = 'fixed';
      
      // Suppression du background avec effet grille
      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .app-container::before {
          content: none !important;
        }
      `;
      document.head.appendChild(styleElement);
    };
    
    // Exécution des fonctions de création d'arrière-plan
    createDarkBackground();
    createParticles();
    createCodeBackground();
    
    // Nettoyage lors du démontage du composant
    return () => {
      const particles = document.querySelector('.tech-particles');
      const codeBackground = document.querySelector('.code-background-global');
      const codeStyle = document.getElementById('code-animation-style');
      
      if (particles) document.body.removeChild(particles);
      if (codeBackground) document.body.removeChild(codeBackground);
      if (codeStyle) document.head.removeChild(codeStyle);
    };
  }, []);
  
  // Ce composant ne rend rien visuellement, il ajoute juste des éléments au DOM
  return null;
};

export default AnimatedBackground;