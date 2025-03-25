import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = ({ menuOpen, toggleMenu }) => {
  return (
    <header className={styles.header}>
      <div
        className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`${styles.mainNav} ${menuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={toggleMenu}>Accueil</Link>
        <Link to="/chatbot" onClick={toggleMenu}>Chatbot</Link>
        <Link to="/projets" onClick={toggleMenu}>Projet</Link>
      </nav>
    </header>
  );
};

export default Navbar;
