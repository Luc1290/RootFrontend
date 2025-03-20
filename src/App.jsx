import { Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Chat from './Chat'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Barre de navigation */}
      <nav className="bg-indigo-700 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Root AI</h1>
        <div>
          <Link to="/" className="mr-4 hover:underline">Accueil</Link>
          <Link to="/chat" className="hover:underline">Chatbot</Link>
        </div>
      </nav>

      {/* Contenu de la page */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        Développé par Luc - © {new Date().getFullYear()}
      </footer>
    </div>
  )
}
