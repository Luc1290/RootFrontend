import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom';
import Home from './components/Home.jsx';
import Chatbot from './components/Chatbot.jsx';
import Admin from './components/AdminDashboard.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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
  return (
    <div className="app-container dark-mode">
      <AnimatedBackground />
      
      <header>
        <div className="logo-container">
          {/* Suppression du logo ici */}
        </div>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon">{menuOpen ? '✕' : '☰'}</span>
        </button>
        
        <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
            <li><Link to="/projets" onClick={() => setMenuOpen(false)}>Projets</Link></li>
            <li><Link to="/competences" onClick={() => setMenuOpen(false)}>Compétences</Link></li>
            <li><Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li><Link to="/chatbot" onClick={() => setMenuOpen(false)} className="chatbot-link">Discuter avec Root:_</Link></li>
          </ul>
        </nav>
      </header>
      
      {/* Le reste du composant reste inchangé */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/projets" element={<div className="page-container"><h2>Mes Projets</h2><p>Page en construction...</p></div>} />
          <Route path="/competences" element={<div className="page-container"><h2>Mes Compétences</h2><p>Page en construction...</p></div>} />
          <Route path="/contact" element={<div className="page-container"><h2>Contact</h2><p>Page en construction...</p></div>} />
          <Route path="*" element={<div className="page-container"><h2>Page introuvable</h2><p>La page demandée n'existe pas.</p></div>} />
        </Routes>
      </main>
      
      <footer>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} Luc Parguel | Root:_ - Tous droits réservés</p>
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