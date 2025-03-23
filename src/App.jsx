import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.jsx';
import Chatbot from './components/Chatbot.jsx';
import Projets from './components/Projets.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Fermer le menu si l'écran est redimensionné
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuOpen]);

  // Empêcher le défilement du corps lorsque le menu est ouvert sur mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <Router>
      <AppContent
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        setMenuOpen={setMenuOpen}
      />
    </Router>
  );
};

// Composant séparé pour le contenu de l'app qui a accès au contexte du Router
const AppContent = ({ menuOpen, toggleMenu, setMenuOpen }) => {
  // Fermer le menu lors de la navigation
  const closeMenu = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <div className="app-container dark-mode">
      <AnimatedBackground />
      
      <header>
        <div className="logo-container">
          {/* Section pour le logo si nécessaire */}
        </div>
        
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Menu de navigation">
          <span className="menu-icon">{menuOpen ? '✕' : '☰'}</span>
        </button>
        
        <nav className={`main-nav ${menuOpen ? 'show' : ''}`}>
          <ul>
            <li><Link to="/" onClick={closeMenu}>Accueil</Link></li>
            <li><Link to="/projets" onClick={closeMenu}>Projets</Link></li>
            <li><Link to="/chatbot" onClick={closeMenu} className="chatbot-link">Discuter avec Root:_</Link></li>
          </ul>
        </nav>
        
        {/* Overlay pour fermer le menu en cliquant à l'extérieur sur mobile */}
        {menuOpen && (
          <div 
            className="menu-overlay" 
            onClick={closeMenu}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 998
            }}
          />
        )}
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/projets" element={<Projets/>} />
          <Route path="*" element={<div className="page-container"><h2>Page introuvable</h2><p>La page demandée n'existe pas.</p></div>} />
        </Routes>
      </main>
      
      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Luc Parguel | Root:_ - RootIA1290@gmail.com -  Tous droits réservés</p>
          <div className="social-links">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;