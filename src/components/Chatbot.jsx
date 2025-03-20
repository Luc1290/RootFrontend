import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  const [thinking, setThinking] = useState(false)
  const endOfMessages = useRef(null)
  const inputRef = useRef(null)

  // Animation des points de chargement
  const [loadingDots, setLoadingDots] = useState('.')
  
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingDots(dots => dots.length >= 3 ? '.' : dots + '.');
      }, 500);
      return () => clearInterval(interval);
    }
  }, [loading]);

  // Effet de simulation de "thinking"
  useEffect(() => {
    if (loading && conversation.length > 0) {
      setThinking(true);
      const thinkingTimeout = setTimeout(() => {
        setThinking(false);
      }, 1000);
      return () => clearTimeout(thinkingTimeout);
    }
  }, [loading, conversation]);

  const sendMessage = async () => {
    if (!message.trim()) return

    setLoading(true)
    setConversation(prev => [...prev, { from: 'user', text: message }])
    setMessage('')

    try {
      // Simuler un petit délai pour montrer l'animation de typing
      setTimeout(async () => {
        try {
          const res = await fetch('https://rootapi-production.up.railway.app/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
          })

          const data = await res.json()
          setConversation(prev => [...prev, { from: 'claude', text: data.reply }])
        } catch (err) {
          console.error('Error:', err);
          setConversation(prev => [...prev, { from: 'error', text: "Erreur de connexion au serveur. Veuillez réessayer." }])
        } finally {
          setLoading(false)
        }
      }, 1500);
    } catch (error) {
        console.error('Error:', error);
      setConversation(prev => [...prev, { from: 'error', text: "Une erreur inattendue s'est produite." }])
      setLoading(false)
    }
  }

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: 'smooth' })
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [conversation, loading])

  // Ajouter une première salutation si la conversation est vide
  useEffect(() => {
    if (conversation.length === 0) {
      setConversation([{ 
        from: 'claude', 
        text: "Bonjour ! Je suis Root, votre assistant IA. Comment puis-je vous aider aujourd'hui ?"
      }]);
    }
  }, [conversation.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 flex flex-col items-center justify-center p-4">
      {/* Header avec effet de verre */}
      <div className="w-full max-w-4xl bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md border-b border-white/10 rounded-t-xl shadow-lg">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
              <span className="font-bold text-white text-xl">R</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Root</h2>
          </Link>
          
          <div className="flex space-x-2">
            <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <button className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md w-full max-w-4xl rounded-b-xl shadow-2xl border border-white/10 h-[80vh] md:h-[70vh]">
        {/* Zone de messages avec effet de défilement */}
        <div className="flex-1 p-6 overflow-auto space-y-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-slate-700">
          {conversation.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`rounded-2xl px-4 py-3 max-w-[80%] shadow-lg ${
                  msg.from === 'user' 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white' 
                    : msg.from === 'claude' 
                      ? 'bg-white/10 backdrop-blur-md text-white border border-white/20' 
                      : 'bg-red-500/80 text-white'
                }`}
              >
                {msg.from === 'claude' && (
                  <div className="flex items-center mb-1">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-2 flex items-center justify-center">
                      <span className="text-xs font-bold">R</span>
                    </div>
                    <span className="text-cyan-300 font-semibold">Root</span>
                  </div>
                )}
                {msg.from === 'user' && (
                  <div className="flex items-center justify-end mb-1">
                    <span className="text-blue-200 font-semibold mr-2">Vous</span>
                    <div className="w-6 h-6 rounded-full bg-blue-400/30 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Indicateur de frappe */}
          {thinking && (
            <div className="flex justify-start">
              <div className="rounded-2xl px-4 py-3 bg-white/10 backdrop-blur-md text-white border border-white/20 shadow-lg">
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 mr-2 flex items-center justify-center">
                    <span className="text-xs font-bold">R</span>
                  </div>
                  <span className="text-cyan-300 font-semibold">Root</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={endOfMessages}></div>
        </div>

        {/* Zone de saisie avec effet de verre */}
        <div className="p-4 border-t border-white/10 bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-md rounded-b-xl">
          <div className="flex gap-3 items-center">
            <button className="bg-white/10 hover:bg-white/20 p-3 rounded-lg text-gray-300 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
              </svg>
            </button>
            
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                className="w-full p-3 pl-4 pr-10 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-gray-400"
                placeholder="Écrivez votre message ici..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                disabled={loading}
              />
              {message.trim() && (
                <button 
                  onClick={() => setMessage('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            <button
              onClick={sendMessage}
              disabled={!message.trim() || loading}
              className={`p-3 rounded-xl shadow-lg transition-all transform ${
                !message.trim() || loading 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white hover:scale-105'
              }`}
            >
              {loading ? (
                <span className="inline-block w-5 h-5 text-center">{loadingDots}</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
          
          <div className="mt-2 text-center text-xs text-gray-500">
            Propulsé par Claude API · Les données sont cryptées · <a href="#" className="text-cyan-400 hover:underline">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </div>
  )
}