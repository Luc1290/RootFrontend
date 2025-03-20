import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 to-purple-300 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white p-10 rounded-xl shadow-lg text-center space-y-6">
        {/* Titre principal */}
        <h1 className="text-5xl font-bold text-indigo-800">Bienvenue sur Root !</h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Root est un projet de chatbot basé sur l'IA, développé avec un stack moderne et robuste.
          Il combine un **Backend en C#/.NET**, un **Frontend en React/Vite**, et une **intégration de l'API Claude**.
        </p>

        {/* Liste des technos utilisées */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Technologies utilisées :</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <span className="bg-indigo-500 text-white px-3 py-2 rounded-lg">C# / .NET 8</span>
            <span className="bg-blue-500 text-white px-3 py-2 rounded-lg">React + Vite</span>
            <span className="bg-purple-500 text-white px-3 py-2 rounded-lg">TailwindCSS</span>
            <span className="bg-green-500 text-white px-3 py-2 rounded-lg">Railway (Déploiement)</span>
            <span className="bg-yellow-500 text-white px-3 py-2 rounded-lg">Claude AI API</span>
            <span className="bg-red-500 text-white px-3 py-2 rounded-lg">GitHub Actions</span>
          </div>
        </div>

        {/* Section Projet */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-2">Pourquoi Root ?</h2>
          <p className="text-gray-600">
            Ce projet a été conçu pour expérimenter l'**IA appliquée au chat**, l'intégration d'API intelligentes, et le
            développement **d'un backend robuste en C#**. Le but est d'en faire un chatbot évolutif et personnalisable.
          </p>
        </div>

        {/* Bouton pour accéder au chatbot */}
        <Link 
          to="/chat"
          className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          Tester Root Chatbot
        </Link>

        {/* Footer */}
        <footer className="text-gray-500 text-sm mt-6">
          Développé par Luc © {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  )
}
