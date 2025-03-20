import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

export default function Home() {
  // Pour l'effet de frappe
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'Root:_';
  const [displayTitle, setDisplayTitle] = useState('');
  const [featureIndex, setFeatureIndex] = useState(0);
  const features = [
    "Intelligence Artificielle conversationnelle",
    "Architecture .NET moderne & performante",
    "Interface utilisateur React dynamique",
    "Propulsé par l'API Claude d'Anthropic",
    "Déploiement continu sur Railway"
  ];
  
  // Référence pour l'animation de parallaxe
  const parallaxRef = useRef(null);
  
  // Effet pour l'animation du titre avec effet de machine à écrire
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (typedTitle.length < fullTitle.length) {
        setTypedTitle(fullTitle.substring(0, typedTitle.length + 1));
      } else {
        // Après avoir tapé le titre complet, nous définissons le titre à afficher
        // avec la classe CSS pour l'animation
        setDisplayTitle(fullTitle);
      }
    }, 180);
    
    return () => clearTimeout(timeout);
  }, [typedTitle]);

  // Rotation des fonctionnalités
  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [features.length]);
  
  // Effet de parallaxe sur le mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!parallaxRef.current) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Sélectionner tous les éléments avec la classe parallax
      const elements = parallaxRef.current.querySelectorAll('.parallax');
      
      elements.forEach(el => {
        const speed = el.getAttribute('data-speed') || 1;
        const moveX = (x - 0.5) * speed * 20;
        const moveY = (y - 0.5) * speed * 20;
        
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 animate-gradient text-slate-50 overflow-hidden" ref={parallaxRef}>
      {/* Éléments d'arrière-plan flous */}
      <div className="blur-bg w-96 h-96 bg-indigo-600 top-10 -left-20 parallax" data-speed="0.5"></div>
      <div className="blur-bg w-80 h-80 bg-cyan-500 bottom-20 right-10 parallax" data-speed="0.3"></div>
      <div className="blur-bg w-64 h-64 bg-violet-600 top-1/2 left-1/3 parallax" data-speed="0.7"></div>
      <div className="noise absolute inset-0 z-0 opacity-20"></div>
      
      {/* Contenu principal */}
      <div className="relative z-10">
        {/* Header avec effet futuriste */}
        <header className="pt-16 pb-10 px-4 relative">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-block mb-3 px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              <span className="text-xs font-tech text-indigo-300">v1.0.0 · PROJET IA · 2025</span>
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight mb-4">
              {displayTitle ? (
                <span className="font-tech text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 animate-gradient text-glow">
                  {displayTitle}
                </span>
              ) : (
                <span className="font-tech">
                  {typedTitle}<span className="animate-blink">|</span>
                </span>
              )}
            </h1>
            
            <p className="text-xl sm:text-2xl text-indigo-200 font-light italic mb-8 h-8">
              {features[featureIndex]}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="tech-badge">ASP.NET 8</span>
              <span className="tech-badge">React 19</span>
              <span className="tech-badge">Vite</span>
              <span className="tech-badge">TailwindCSS</span>
              <span className="tech-badge">Claude API</span>
              <span className="tech-badge">Railway</span>
            </div>
            
            <div className="flex justify-center">
              <Link 
                to="/chat" 
                className="btn-primary text-lg group"
              >
                <span className="relative z-10 flex items-center">
                  Démarrer une conversation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </header>
        
        {/* Section principale - Présentation */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="animate-fadeIn">
                <h2 className="text-3xl font-bold mb-6 text-gradient">À propos de Root</h2>
                <div className="space-y-4 text-slate-300">
                  <p>
                    Root est une plateforme d'intelligence artificielle conversationnelle conçue pour explorer les possibilités des grands modèles de langage dans un environnement moderne et évolutif.
                  </p>
                  <p>
                    Combinant un backend robuste en C# avec une interface utilisateur élégante en React, Root offre une expérience de chat IA fluide et naturelle grâce à l'intégration de l'API Claude.
                  </p>
                  <p>
                    Ce projet représente une démonstration concrète d'architecture microservices, de déploiement continu et d'intégration d'IA moderne.
                  </p>
                </div>
              </div>
              
              <div className="neo-card animate-fadeIn stagger-children glass relative overflow-hidden group">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity"></div>
                <h2 className="text-3xl font-bold mb-6 text-gradient">Architecture</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Backend C# (.NET 8)</h3>
                      <p className="text-slate-300">API RESTful haute performance avec intégration Claude et déploiement containerisé</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Frontend React 19</h3>
                      <p className="text-slate-300">Interface utilisateur moderne avec TailwindCSS et Vite pour une expérience fluide</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Déploiement automatisé</h3>
                      <p className="text-slate-300">Pipeline CI/CD avec GitHub Actions et déploiement sur Railway</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Fonctionnalités */}
        <section className="py-16 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gradient">
              Fonctionnalités principales
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 stagger-children">
              <div className="neo-card glass">
                <div className="h-14 w-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">IA Conversationnelle</h3>
                <p className="text-slate-300">Discussions naturelles et intelligentes grâce à l'intégration de l'API Claude d'Anthropic.</p>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <span className="text-indigo-300 font-tech text-sm">FONCTION PRINCIPALE</span>
                </div>
              </div>
              
              <div className="neo-card glass">
                <div className="h-14 w-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Architecture moderne</h3>
                <p className="text-slate-300">Conçu avec les meilleures pratiques de développement, évolutivité et maintenabilité.</p>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <span className="text-cyan-300 font-tech text-sm">INGÉNIERIE AVANCÉE</span>
                </div>
              </div>
              
              <div className="neo-card glass">
                <div className="h-14 w-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Sécurité intégrée</h3>
                <p className="text-slate-300">Protection des clés API via secrets et mise en œuvre des meilleures pratiques de sécurité.</p>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <span className="text-purple-300 font-tech text-sm">FIABILITÉ & CONFIANCE</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Appel à l'action */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="blur-bg w-96 h-96 bg-indigo-600/30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-5xl font-bold mb-6 text-white">Prêt à essayer <span className="text-gradient">Root</span> ?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Découvrez les capacités de l'IA conversationnelle à travers une interface moderne et intuitive. Lancez une conversation maintenant !
            </p>
            <Link 
              to="/chat" 
              className="inline-block bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg py-4 px-10 rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all"
            >
              Commencer à discuter
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-4 border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl font-tech font-bold text-indigo-400">Root:_</h2>
                <p className="text-slate-400 mt-2">Projet IA conversationnelle</p>
              </div>
              
              <div className="flex space-x-6">
                <a href="https://github.com/luc1290/RootBackend" className="text-slate-400 hover:text-indigo-400 transition-colors" target="_blank" rel="noopener noreferrer">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
              <p>© {new Date().getFullYear()} Root Project | Développé par Luc | Propulsé par Claude AI</p>
              <p className="mt-2">Tous droits réservés.</p>
            </div>
          </div>
        </footer>

        {/* Ajouter ces styles pour les animations */}
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