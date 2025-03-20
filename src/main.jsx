import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Importer les styles dans cet ordre pour que index.css ait la priorité
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)