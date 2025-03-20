import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Home() {
  // Pour l'effet de frappe
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'Root:_';
  const [featureIndex, setFeatureIndex] = useState(0);
  const features = [
    "IA conversationnelle",
    "Architecture .NET 8",
    "Interface React moderne",
    "API Claude intégrée",
    "Déploiement Railway"
  ];
  
  // Effet pour l'animation du titre avec effet de machine à écrire
  useEffect(() => {
    if (typedTitle.length < fullTitle.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      }, 180);
      
      return () => clearTimeout(timeout);
    }
  }, [typedTitle, fullTitle]);

  // Rotation des fonctionnalités
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Fond avec gradient subtil */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-slate-900 z-0"></div>
      
      {/* Orbes décoratifs */}
      <div className="absolute top-20 -left-20 w-72 h-72 rounded-full bg-indigo-600/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10 container mx-auto px-4 pt-8 pb-6">
        {/* En-tête avec logo et navigation */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h1 className="text-3xl font-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
              Root<span className="text-white">:_</span>
            </h1>
            <div className="ml-4 text-xs py-1 px-2 bg-indigo-500/20 rounded-md border border-indigo-500/20 text-indigo-300 font-tech">
              v1.0.0
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/luc1290/RootBackend" className="text-slate-400 hover:text-indigo-400 transition-colors" target="_blank" rel="noopener noreferrer">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
            <Link 
              to="/chat" 
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              <span>Accéder au chat</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </header>

        {/* Contenu principal en deux colonnes */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          {/* Colonne de gauche: titre et description */}
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              <span>Créer une</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                expérience IA
              </span><br/>
              <span>conversationnelle</span>
            </h2>
            
            <p className="text-slate-300 text-lg mb-8 max-w-lg">
              Root est une plateforme d'intelligence artificielle qui combine un backend 
              C#/.NET 8 avec une interface React et l'API Claude d'Anthropic.
            </p>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">ASP.NET 8</span>
              <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">React 19</span>
              <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">TailwindCSS</span>
              <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">Claude AI</span>
              <span className="px-3 py-1 text-sm rounded-full font-medium bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">Railway</span>
            </div>
            
            <Link 
              to="/chat" 
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg hover:shadow-indigo-500/20 transition-all"
            >
              <span className="mr-2">Démarrer une conversation</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            
            <p className="text-xs text-slate-500 mt-3">Projet open-source développé par Luc © 2025</p>
          </div>
          
          {/* Colonne de droite: aperçu/demo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-sm"></div>
            
            <div className="relative bg-slate-800/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 shadow-xl">
              <div className="flex items-center mb-2 text-xs text-slate-500">
                <div className="flex space-x-1 mr-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                </div>
                <div>root-chatbot.app</div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Root Chat</h3>
                <div className="text-slate-300 text-sm">
                  {features[featureIndex]}
                  <span className="animate-blink ml-1">|</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs">U</div>
                  <div className="flex-1 bg-slate-700/50 rounded-lg p-3 text-sm">
                    Bonjour, peux-tu m'aider à comprendre comment fonctionne une API REST?
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-xs">R</div>
                  <div className="flex-1 bg-slate-700/50 rounded-lg p-3 text-sm">
                    Bien sûr ! Une API REST est une interface qui permet à différents systèmes de communiquer via HTTP. Elle utilise des méthodes comme GET, POST, PUT et DELETE pour manipuler des ressources identifiées par des URLs.
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs">U</div>
                  <div className="flex-1 bg-slate-700/50 rounded-lg p-3 text-sm">
                    Merci pour l'explication ! Quels sont les avantages par rapport à SOAP ?
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-slate-700/50 flex gap-2">
                <input 
                  type="text" 
                  placeholder="Écrivez votre message..." 
                  className="flex-1 bg-slate-900/50 rounded-lg px-3 py-2 text-sm border border-slate-700/50 focus:outline-none focus:border-indigo-500"
                />
                <button className="bg-indigo-600 rounded-lg p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-indigo-600/20 rounded-full py-1 px-3 text-xs text-indigo-300 border border-indigo-500/20">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                <span>En ligne</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg p-4 shadow-lg">
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold">4.8</div>
                <div className="flex">
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                </div>
              </div>
              <div className="text-xs opacity-75">sur 1000+ avis</div>
            </div>
          </div>
        </div>
        
        {/* Fonctionnalités */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
            <div className="h-12 w-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">IA Conversationnelle</h3>
            <p className="text-slate-300 text-sm">Intégration de l'API Claude d'Anthropic pour des conversations naturelles et intelligentes.</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
            <div className="h-12 w-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Architecture .NET</h3>
            <p className="text-slate-300 text-sm">Backend robuste en C#/.NET 8 avec API RESTful et déploiement containerisé sur Railway.</p>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-lg p-6 border border-slate-700/50">
            <div className="h-12 w-12 bg-cyan-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Interface React</h3>
            <p className="text-slate-300 text-sm">Frontend moderne avec React 19, TailwindCSS et Vite pour une expérience utilisateur fluide.</p>
          </div>
        </div>
        
        {/* Pied de page */}
        <footer className="mt-auto pt-6 border-t border-slate-800/50 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Root Project | Développé par Luc</p>
        </footer>
        
        {/* Style pour l'animation du curseur clignotant */}
        <style jsx>{`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 1s step-end infinite;
          }
        `}</style>
      </div>
    </div>
  );
}