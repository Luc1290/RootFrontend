import { useState, useEffect, useRef } from 'react'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  const endOfMessages = useRef(null)

  const sendMessage = async () => {
    if (!message.trim()) return

    setLoading(true)
    setConversation(prev => [...prev, { from: 'user', text: message }])
    setMessage('')

    try {
      const res = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      setConversation(prev => [...prev, { from: 'claude', text: data.reply }])
    } catch {
      setConversation(prev => [...prev, { from: 'error', text: "Erreur serveur" }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="flex flex-col bg-white rounded-xl shadow-lg w-full max-w-4xl h-[80vh] md:h-[90vh]">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold text-indigo-800">Conversation avec Root</h2>
        </div>

        <div className="flex-1 p-4 overflow-auto space-y-3">
          {conversation.map((msg, idx) => (
            <div key={idx} className={`rounded-lg px-4 py-2 max-w-[75%] ${
                msg.from === 'user' ? 'bg-indigo-500 text-white ml-auto' :
                msg.from === 'claude' ? 'bg-gray-200 text-gray-800 mr-auto' :
                'bg-red-400 text-white mx-auto'
              }`}>
              <strong>{msg.from === 'user' ? 'Toi' : msg.from === 'claude' ? 'Claude' : 'Erreur'} :</strong> {msg.text}
            </div>
          ))}
          <div ref={endOfMessages}></div>
        </div>

        <div className="p-4 border-t flex gap-2">
          <input
            className="flex-1 p-2 border rounded-lg focus:outline-indigo-500"
            placeholder="Écris ton message ici..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
            disabled={loading}
          >
            {loading ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </div>
  )
}
