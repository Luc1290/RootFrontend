import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("https://api.rootai.fr/api/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.IsAuthenticated || data.authenticated); // selon la route
        }
      } catch {
        console.log("Non authentifié");
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("https://api.rootai.fr/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Erreur pendant la déconnexion :", err);
    }
  
    navigate("/");
    window.location.reload();
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
        {!isAuthenticated ? (
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>Se connecter</Link>
        ) : (
          <button onClick={handleLogout} className={styles.logoutBtn}>Se déconnecter</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
