import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Home from './components/Home';
import About from './components/Projets';
import AnimatedBackground from './components/AnimatedBackground';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <AnimatedBackground />
      <div className="app-container">
        <header>
          <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <nav className={`main-nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/" onClick={toggleMenu}>Accueil</Link>
            <Link to="/chatbot" onClick={toggleMenu}>Chatbot</Link>
            <Link to="/projets" onClick={toggleMenu}>Projet</Link>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/projets" element={<About />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
         <Footer />
      </div>
    </Router>
  );
}

export default App;