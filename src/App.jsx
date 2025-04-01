import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import Home from './components/Home';
import Projets from './components/Projets';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import Navbar from './components/Navbar'; 
import Messagedb from "./components/Messagedb";
import Confidentialite from './components/Confidentialite';
import Conditions from './components/Conditions';
import Login from './components/Login';
import { AuthProvider } from './context/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/projets" element={<Projets />} />
              <Route path="/confidentialite" element={<Confidentialite />} />
              <Route path="/conditions" element={<Conditions />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/messagedb" element={<Messagedb />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;

