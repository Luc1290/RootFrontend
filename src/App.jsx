import { useState } from 'react'

export default function App() {
  const [message, setMessage] = useState('')
  const [reply, setReply] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    setLoading(true)
    setReply('')

    try {
      const res = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      setReply(data.reply)
    } catch (error) {
      console.error(error);
      setReply('Erreur : impossible de joindre le serveur.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">💬 Chatbot Claude</h1>
        
        <input
          className="w-full p-3 border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:border-blue-400 transition"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Écris ton message ici..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        
        <button
          onClick={sendMessage}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Envoyer à Claude"}
        </button>
        
        {reply && (
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm text-gray-700 whitespace-pre-line">
            {reply}
          </div>
        )}
      </div>
    </div>
  )
}
