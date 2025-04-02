import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from './Logo';
import { useAuth } from '../context/useAuth';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, isReady } = useAuth();

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

      <div className={`${styles.menuToggle} ${isMenuOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>

      <nav className={`${styles.mainNav} ${isMenuOpen ? styles.open : ''}`}>
        <Link to="/" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
        <Link to="/chatbot" onClick={() => setIsMenuOpen(false)}>Chatbot</Link>
        <Link to="/projets" onClick={() => setIsMenuOpen(false)}>Projets</Link>
        {isReady && (
          !isAuthenticated ? (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>Se connecter</Link>
          ) : (
            <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profil</Link>
          )
        )}
      </nav>
    </header>
  );
};

export default Navbar;
