import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import Chatbot from './components/Chatbot.jsx';

// Le composant StartChatButton doit être défini à l'intérieur du routeur pour utiliser useNavigate
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
      <header>
        <div className="logo-container">
          <div className="logo title-logo">
            <Link to="/" className="logo-text">Root:_</Link>
          </div>
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
        
        {/* Suppression du bouton toggle mode sombre/clair */}
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={
            <div className="home-with-cta">
              <Home />
              <div className="chat-cta">
                <StartChatButton />
              </div>
            </div>
          } />
          <Route path="/chatbot" element={<Chatbot />} />
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

// Composant StartChatButton en utilisant useNavigate
const StartChatButton = () => {
  const navigate = useNavigate();
  
  const handleStartChat = () => {
    navigate('/chatbot');
  };
  
  return (
    <button onClick={handleStartChat} className="start-chat-btn pulse-animation">
      Démarrer une conversation avec Root:_
    </button>
  );
};

export default App;