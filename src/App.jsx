import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chatbot from './Chatbot';
import './App.css'; 
import './index.css';

export default function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        {/* Navigation en haut */}
        <header className="navbar">
          <div className="container">
            <h1 className="logo">Root:_</h1>
            <nav>
              <a href="/" className="nav-link">Accueil</a>
              <a href="/chat" className="nav-link">Chatbot</a>
            </nav>
          </div>
        </header>

        {/* Contenu principal */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chatbot />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© {new Date().getFullYear()} Root AI | Développé par Luc</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}
