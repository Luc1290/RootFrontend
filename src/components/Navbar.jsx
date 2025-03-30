// Pour intégrer votre logo SVG dans la Navbar, 
// voici comment vous devriez modifier votre composant Navbar.jsx :

import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assurez-vous d'avoir cette import
import styles from './Navbar.module.css';
import Logo from './Logo'; // Importez votre composant Logo

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <Logo size="medium" />
        </Link>
      </div>
      
      <div 
        className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={`${styles.mainNav} ${isMenuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
        <Link to="/chatbot" onClick={() => setIsMenuOpen(false)}>Chatbot</Link>
        <Link to="/projets" onClick={() => setIsMenuOpen(false)}>Projets</Link>
      </nav>
    </header>
  );
};

export default Navbar;