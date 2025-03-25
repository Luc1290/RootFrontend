import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <div className={`${styles.footerSection} ${styles.navigationSection}`}>
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/chatbot">Conversation</Link></li>
              <li><Link to="/projets">À propos du projet</Link></li>
            </ul>
          </div>
          
          <div className={`${styles.footerSection} ${styles.contactSection}`}>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:RootIA1290@gmail.com">Email</a></li>
              <li><Link to="/projets">Soutenir le projet</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBottom}>
        <p>Root:_ &copy; {new Date().getFullYear()} | Projet indépendant 100% créé à la main | Respecte votre vie privée</p>
      </div>
    </footer>
  );
};

export default Footer;