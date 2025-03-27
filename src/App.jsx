import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Home from './components/Home';
import About from './components/Projets';
import AnimatedBackground from './components/AnimatedBackground';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; // tout en haut du fichier
import Messagedb from "./components/Messagedb";


function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Router>
      <AnimatedBackground />
      <div className="app-container">
        <Navbar menuOpen={menuOpen} toggleMenu={toggleMenu} />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/projets" element={<About />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/messagedb" element={<Messagedb />} />
          </Routes>
        </main>
         <Footer />
      </div>
    </Router>
  );
}

export default App;