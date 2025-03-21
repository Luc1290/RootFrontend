import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Développeur & Créateur de Root:_";
  const [activeTab, setActiveTab] = useState('all');
  
  // Animation de chargement
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Animation de frappe de texte
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [typedText]);
  
  // Projets fictifs
  const projects = [
    {
      id: 1,
      title: "Root:_ Framework",
      description: "Architecture backend pour systèmes conversationnels IA avancés",
      image: "/api/placeholder/600/400",
      category: "ai",
      technologies: ["Python", "TensorFlow", "NLP", "Machine Learning"]
    },
    {
      id: 2,
      title: "Plateforme d'analyse IA",
      description: "Interface de visualisation et d'analyse pour modèles d'IA conversationnels",
      image: "/api/placeholder/600/400",
      category: "web",
      technologies: ["React", "D3.js", "Node.js", "WebSocket"]
    },
    {
      id: 3,
      title: "Système de recommandation",
      description: "Moteur de recommandation intelligent basé sur l'apprentissage par renforcement",
      image: "/api/placeholder/600/400",
      category: "ai",
      technologies: ["Python", "PyTorch", "API REST", "Redis"]
    },
    {
      id: 4,
      title: "Interface conversationnelle",
      description: "Framework front-end pour interfaces conversationnelles avancées",
      image: "/api/placeholder/600/400",
      category: "web",
      technologies: ["React", "TypeScript", "WebRTC", "IndexedDB"]
    }
  ];
  
  // Filtre des projets
  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);
  
  // Compétences
  const skills = [
    { name: "Intelligence Artificielle", level: 90 },
    { name: "Machine Learning", level: 85 },
    { name: "Python", level: 90 },
    { name: "JavaScript/React", level: 85 },
    { name: "Traitement Langage Naturel", level: 80 },
    { name: "Architecture Systèmes IA", level: 85 }
  ];

  return (
    <div className={`home-container ${isLoaded ? 'fade-in' : ''}`}>
      {/* Section Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1>Bonjour, je suis <span className="highlight">Luc Parguel</span></h1>
          <h2 className="typewriter">{typedText}<span className="cursor">|</span></h2>
          <p className="hero-description">
            Je développe des solutions web innovantes et des systèmes d'intelligence artificielle,
            avec une attention particulière sur Root:_, mon assistant IA en évolution vers une AGI.
          </p>
          <div className="hero-buttons">
            <Link to="/chatbot" className="btn">Discuter avec Root:_</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/api/placeholder/600/600" alt="Portrait professionnel" />
        </div>
      </section>
      
      {/* Section À propos */}
      <section className="section about-section">
        <h2 className="section-title">À propos de moi</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Passionné par le développement web et l'intelligence artificielle, 
              je m'efforce de créer des solutions digitales innovantes et accessibles.
              Mon parcours m'a permis d'acquérir une expertise en développement full-stack
              et en systèmes d'IA conversationnelle.
            </p>
            <p>
              Après mes études en informatique, j'ai développé une fascination pour les possibilités 
              offertes par l'IA. Aujourd'hui, je consacre une grande partie de mon temps au développement 
              de Root:_, mon assistant en évolution vers une AGI (Intelligence Artificielle Générale),
              tout en continuant à explorer les technologies web modernes.
            </p>
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">Années d'expérience</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Projets terminés</span>
              </div>
              <div className="stat">
                <span className="stat-number">30+</span>
                <span className="stat-label">Clients satisfaits</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Root:_ */}
      <section className="section root-section">
        <h2 className="section-title">Root:_ - Mon Assistant IA</h2>
        <div className="root-content">
          <div className="root-image">
            <img src="/api/placeholder/500/300" alt="Interface de Root:_" />
          </div>
          <div className="root-info">
            <p>
              Root:_ est mon projet phare, un assistant d'intelligence artificielle 
              en constante évolution. Conçu pour apprendre et s'adapter,
              Root:_ est actuellement en développement pour devenir une véritable AGI
              (Intelligence Artificielle Générale).
            </p>
            <p>
              Contrairement aux assistants IA conventionnels, Root:_ est conçu pour 
              comprendre le contexte, apprendre de ses interactions et développer
              une compréhension plus profonde des intentions humaines.
            </p>
            <Link to="/chatbot" className="btn">Essayer Root:_ maintenant</Link>
          </div>
        </div>
      </section>

      {/* Section Projets */}
      <section className="section projects-section">
        <h2 className="section-title">Autres projets</h2>
        <div className="project-tabs">
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tous
          </button>
          <button 
            className={`tab-btn ${activeTab === 'web' ? 'active' : ''}`}
            onClick={() => setActiveTab('web')}
          >
            Web
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            IA
          </button>
          <button 
            className={`tab-btn ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => setActiveTab('design')}
          >
            Design
          </button>
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span className="tech-tag" key={index}>{tech}</span>
                  ))}
                </div>
                <Link to={`/projets/${project.id}`} className="project-link">
                  Voir le projet
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/projets" className="btn">Voir tous les projets</Link>
        </div>
      </section>
      
      {/* Section Compétences */}
      <section className="section skills-section">
        <h2 className="section-title">Mes compétences</h2>
        <div className="skills-container">
          {skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Section Contact */}
      <section className="section contact-section">
        <h2 className="section-title">Travaillons ensemble</h2>
        <p className="contact-intro">
          Vous avez un projet en tête ? N'hésitez pas à me contacter pour en discuter !
        </p>
        <Link to="/contact" className="btn btn-large">Me contacter</Link>
      </section>
    </div>
  );
};

export default Home;