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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
      {/* Banner en haut avec effet de verre */}
      <div className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-md border-b border-white/10 py-4">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            <span className="text-cyan-400">{typedTitle}</span>
            {typedTitle.length < fullTitle.length && <span className="animate-pulse">|</span>}
          </h1>
          
          <Link 
            to="/chat"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-md transition-colors shadow-lg"
          >
            Accéder au chat
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Héro avec illustration */}
        <main className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="px-4 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">Plateforme d'IA Conversationnelle</span>
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                <span>Créer une</span><br/>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">expérience IA</span><br/>
                <span>conversationnelle</span>
              </h2>
            </div>
            
            <p className="text-gray-300 text-lg">
              Root est une plateforme d'intelligence artificielle conversationnelle 
              qui combine un backend C#/.NET avec une interface React et l'API Claude d'Anthropic
              pour des conversations naturelles et intelligentes.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <span className="bg-gradient-to-r from-blue-900 to-blue-800 text-blue-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">ASP.NET 8</span>
              <span className="bg-gradient-to-r from-cyan-900 to-cyan-800 text-cyan-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">React 19</span>
              <span className="bg-gradient-to-r from-purple-900 to-purple-800 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Claude API</span>
              <span className="bg-gradient-to-r from-teal-900 to-teal-800 text-teal-300 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">TailwindCSS</span>
            </div>
            
            <div className="flex gap-4">
              <Link 
                to="/chat"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transition-all hover:scale-105"
              >
                Démarrer une conversation
              </Link>
              <a 
                href="#features" 
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all hover:scale-105"
              >
                Découvrir les fonctionnalités
              </a>
            </div>
          </div>
          
          <div className="relative">
            {/* Cercles lumineux d'arrière-plan */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full filter blur-3xl"></div>
            
            {/* Boîte de chat avec effet de verre */}
            <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold mb-6 text-cyan-300">Aperçu du chat</h3>
              
              <div className="space-y-6">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur">
                  <div className="font-semibold text-cyan-300 mb-1">Utilisateur</div>
                  <div>Bonjour, peux-tu m'aider à comprendre comment fonctionne une API REST?</div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 rounded-xl">
                  <div className="font-semibold text-cyan-300 mb-1">Root</div>
                  <div>Bien sûr ! Une API REST est une interface qui permet à différents systèmes de communiquer via HTTP. Elle utilise des méthodes comme GET, POST, PUT et DELETE pour manipuler des ressources identifiées par des URLs.</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-white/20 flex gap-2 items-center">
                <input 
                  type="text" 
                  placeholder="Écrivez votre message..." 
                  className="flex-1 bg-white/10 p-3 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled
                />
                <button className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-lg shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Fonctionnalités */}
        <section id="features" className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent inline-block">Fonctionnalités principales</h2>
            <p className="text-gray-300 mt-3 max-w-2xl mx-auto">Découvrez comment Root peut transformer vos expériences conversationnelles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 p-8 rounded-2xl shadow-xl border border-blue-700/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-blue-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">IA Conversationnelle</h3>
              <p className="text-gray-300">Discussions naturelles et intelligentes grâce à l'API Claude. Réponses contextuelles et adaptées à vos besoins spécifiques.</p>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-900/40 to-cyan-800/40 p-8 rounded-2xl shadow-xl border border-cyan-700/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-cyan-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">Backend .NET</h3>
              <p className="text-gray-300">Architecture robuste et sécurisée en C# avec .NET 8. Performance optimale et scalabilité pour vos applications.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 p-8 rounded-2xl shadow-xl border border-purple-700/30 hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-purple-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-purple-300 mb-3">Interface React</h3>
              <p className="text-gray-300">UI moderne et réactive avec React et TailwindCSS. Expérience utilisateur fluide et design adaptatif pour tous les appareils.</p>
            </div>
          </div>
        </section>

        {/* Bannière CTA */}
        <section className="my-16 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-3xl p-12 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à commencer votre expérience avec Root?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Lancez-vous dans une conversation intelligente et découvrez comment Root peut transformer votre manière d'interagir avec l'IA.</p>
            <Link 
              to="/chat"
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl inline-block transition-all hover:scale-105"
            >
              Commencer maintenant
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-gray-400 mt-16 pt-8 border-t border-gray-800">
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
              </svg>
            </a>
          </div>
          <p className="mb-2">© {new Date().getFullYear()} Root Project | Développé par Luc</p>
          <p className="text-sm">Architecture robuste. Interface élégante. Conversations intelligentes.</p>
        </footer>
      </div>
    </div>
  );
}