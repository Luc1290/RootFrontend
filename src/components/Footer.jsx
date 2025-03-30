import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <Logo size="medium" />
        </div>
        
        <div className={styles.footerLinks}>
          <div className={`${styles.footerSection} ${styles.navigationSection}`}>
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/chatbot">Chatbot</Link></li>
              <li><Link to="/projects">Projets</Link></li>
              <li><Link to="/about">À propos</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h4>Technologie</h4>
            <ul>
              <li><a href="#ia">Intelligence Artificielle</a></li>
              <li><a href="#agi">AGI</a></li>
              <li><a href="#nlp">Traitement du langage</a></li>
              <li><a href="#ml">Machine Learning</a></li>
            </ul>
          </div>
          
          <div className={`${styles.footerSection} ${styles.contactSection}`}>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:rootai1290@gmail.com">Email</a></li>
              <li><a href="https://github.com/root-ai" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://twitter.com/root_ai" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://linkedin.com/in/root-ai" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>© {currentYear} Root:_ Intelligence Artificielle. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;