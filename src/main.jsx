import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Ton composant racine
import './App.css'; // Si tu utilises un fichier CSS global
import './styles/Responsive.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
