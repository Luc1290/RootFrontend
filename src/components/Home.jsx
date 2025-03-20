import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Home() {
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'Root:_';
  
  // Effet pour l'animation du titre
  useEffect(() => {
    if (typedTitle.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, 200);
      
      return () => clearTimeout(timeout);
    }
  }, [typedTitle, fullTitle]);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* En-tête */}
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold">
            <span className="text-blue-500">{typedTitle}</span>
            {typedTitle.length < fullTitle.length && <span className="animate-pulse">|</span>}
          </h1>
          
          <Link 
            to="/chat"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Accéder au chat
          </Link>
        </header>

        {/* Contenu principal */}
        <main className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              <span>Créer une</span><br/>
              <span className="text-blue-400">expérience IA</span><br/>
              <span>conversationnelle</span>
            </h2>
            
            <p className="text-gray-300 mb-8">
              Root est une plateforme d'intelligence artificielle conversationnelle 
              qui combine un backend C#/.NET avec une interface React et l'API Claude d'Anthropic.
            </p>
            
            <div className="mb-8 flex flex-wrap gap-2">
              <span className="bg-blue-900/50 text-blue-300 px-3 py-1 text-sm rounded">ASP.NET 8</span>
              <span className="bg-blue-900/50 text-blue-300 px-3 py-1 text-sm rounded">React 19</span>
              <span className="bg-blue-900/50 text-blue-300 px-3 py-1 text-sm rounded">Claude API</span>
            </div>
            
            <Link 
              to="/chat"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold inline-block"
            >
              Démarrer une conversation
            </Link>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl">
            <h3 className="text-xl font-bold mb-4">Aperçu du chat</h3>
            
            <div className="space-y-4">
              <div className="bg-slate-700 p-3 rounded">
                <div className="font-semibold">Utilisateur</div>
                <div>Bonjour, peux-tu m'aider à comprendre comment fonctionne une API REST?</div>
              </div>
              
              <div className="bg-blue-900/30 p-3 rounded">
                <div className="font-semibold">Root</div>
                <div>Bien sûr ! Une API REST est une interface qui permet à différents systèmes de communiquer via HTTP. Elle utilise des méthodes comme GET, POST, PUT et DELETE.</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700 flex gap-2">
              <input 
                type="text" 
                placeholder="Écrivez votre message..." 
                className="flex-1 bg-slate-700 p-2 rounded"
                disabled
              />
              <button className="bg-blue-600 px-3 py-2 rounded">
                Envoyer
              </button>
            </div>
          </div>
        </main>

        {/* Fonctionnalités */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">IA Conversationnelle</h3>
            <p>Discussions naturelles et intelligentes grâce à l'API Claude.</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Backend .NET</h3>
            <p>Architecture robuste et sécurisée en C# avec .NET 8.</p>
          </div>
          
          <div className="bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Interface React</h3>
            <p>UI moderne et réactive avec React et TailwindCSS.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-500 mt-16 pt-8 border-t border-gray-800">
          <p>© {new Date().getFullYear()} Root Project | Développé par Luc</p>
        </footer>
      </div>
    </div>
  );
}