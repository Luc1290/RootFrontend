import React, { useEffect } from 'react';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = () => {
  useEffect(() => {
    const createParticles = () => {
      const existingParticles = document.querySelector(`.${styles.techParticles}`);
      if (existingParticles) {
        document.body.removeChild(existingParticles);
      }

      const particles = document.createElement('div');
      particles.className = styles.techParticles;

      for (let i = 0; i < 80; i++) {
        const particle = document.createElement('div');
        particle.className = styles.particle;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

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

    const createCodeBackground = () => {
      const existingCodeBg = document.querySelector(`.${styles.codeBackgroundGlobal}`);
      if (existingCodeBg) {
        document.body.removeChild(existingCodeBg);
      }

      const codeBackground = document.createElement('div');
      codeBackground.className = styles.codeBackgroundGlobal;
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

      for (let i = 0; i < 80; i++) {
        const codeLine = document.createElement('div');
        codeLine.className = styles.codeLine;
        codeLine.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        codeLine.style.left = `${Math.random() * 100}%`;
        codeLine.style.animation = 'code-scroll linear infinite';
        codeLine.style.animationDuration = `${8 + Math.random() * 10}s`;
        codeLine.style.animationDelay = `${Math.random() * 5}s`;

        codeBackground.appendChild(codeLine);
      }

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

    const createDarkBackground = () => {
      if (document.body.style.background) {
        document.body.style.background = '';
      }
      document.body.style.background = 'var(--dark-bg, #0a0e17)';
      document.body.style.backgroundImage = 'radial-gradient(circle at 30% 20%, rgba(12, 227, 255, 0.05), transparent 25%), radial-gradient(circle at 70% 60%, rgba(86, 3, 173, 0.05), transparent 25%)';
      document.body.style.backgroundAttachment = 'fixed';

      const styleElement = document.createElement('style');
      styleElement.textContent = `
        .app-container::before {
          content: none !important;
        }
      `;
      document.head.appendChild(styleElement);
    };

    createDarkBackground();
    createParticles();
    createCodeBackground();

    return () => {
      const particles = document.querySelector(`.${styles.techParticles}`);
      const codeBackground = document.querySelector(`.${styles.codeBackgroundGlobal}`);
      const codeStyle = document.getElementById('code-animation-style');

      if (particles && document.body.contains(particles)) {
        document.body.removeChild(particles);
      }
      
      if (codeBackground && document.body.contains(codeBackground)) {
        document.body.removeChild(codeBackground);
      }
      if (codeStyle && document.head.contains(codeStyle)) {
        document.head.removeChild(codeStyle);
      }
      
    };
  }, []);

  return null;
};

export default AnimatedBackground;
