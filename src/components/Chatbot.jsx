import { useState, useRef, useEffect } from 'react'

export default function Chatbot() {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  const sendMessage = async () => {
    if (!message) return
    setLoading(true)

    const newConversation = [...conversation, { sender: 'Toi', text: message }]
    setConversation(newConversation)
    setMessage('')

    try {
      const res = await fetch('https://rootapi-production.up.railway.app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })

      const data = await res.json()
      setConversation([...newConversation, { sender: 'Claude', text: data.reply }])
    } catch (error) {
        console.error(error);
      setConversation([...newConversation, { sender: 'Claude', text: 'Erreur serveur.' }])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center p-4">
      <div className="flex-1 w-full max-w-2xl overflow-auto mb-20">
        {conversation.map((msg, index) => (
          <div key={index} className={`my-2 ${msg.sender === 'Claude' ? 'text-left' : 'text-right'}`}>
            <span className={`inline-block px-4 py-2 rounded-lg ${msg.sender === 'Claude' ? 'bg-gray-700 text-white' : 'bg-blue-500 text-white'}`}>
              <b>{msg.sender}:</b> {msg.text}
            </span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-gray-900 p-4">
        <input
          className="w-full max-w-xl p-2 rounded-lg shadow-inner"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tape ton message ici..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          disabled={loading}
        />
        <button
          className="ml-2 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg"
          onClick={sendMessage}
          disabled={loading}
        >
          {loading ? '...' : 'Envoyer'}
        </button>
      </div>
    </div>
  )
}
