import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl p-10 bg-white rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-indigo-800 mb-6">Bienvenue sur Root AI</h1>
        <p className="text-gray-600 text-lg">
          Root AI est un chatbot intelligent utilisant **C#/.NET** pour le backend et **React/Tailwind** pour le frontend.
          Il est hébergé sur Railway et utilise l'API Claude pour générer des réponses précises et rapides.
        </p>

        <h2 className="text-2xl font-semibold text-indigo-700 mt-6">Technologies utilisées :</h2>
        <ul className="list-disc ml-6 text-gray-600">
          <li>C# / .NET 8 (Backend)</li>
          <li>React + Vite (Frontend)</li>
          <li>TailwindCSS (Style)</li>
          <li>Railway (Déploiement)</li>
          <li>Claude AI API</li>
        </ul>

        <div className="mt-6">
          <Link to="/chat" className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
            Tester le Chatbot
          </Link>
        </div>
      </div>
    </div>
  )
}
