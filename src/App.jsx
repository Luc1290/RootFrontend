import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Chatbot from './components/Chatbot'
import './App.css' // Importer explicitement
import './index.css' // S'assurer que index.css est chargé après App.css pour avoir la priorité

export default function App() {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatbot />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}