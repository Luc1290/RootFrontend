import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-600 text-white p-4">
      <h1 className="text-4xl font-bold mb-4">Root !</h1>
      <p className="text-lg mb-8">Clique pour démarrer la conversation avec Root.</p>
      <Link to="/chat">
        <button className="px-6 py-2 bg-white text-indigo-600 rounded-lg font-semibold shadow-lg hover:shadow-xl transition">
          Commencer à discuter
        </button>
      </Link>
    </div>
  )
}
