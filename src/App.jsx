import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Chatbot from './components/Chatbot'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  )
}
