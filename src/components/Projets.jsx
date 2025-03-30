import React from 'react';
import styles from './Projets.module.css';
import Logo from './Logo';

// Composant de carte de projet avec emoji au lieu d'image
const ProjectCard = ({ project }) => {
  return (
    <div className={styles.projectCard}>
      <div className={styles.emojiContainer}>
        <div className={styles.emoji} aria-hidden="true">
          {project.emoji}
        </div>
      </div>
      <div className={styles.projectContent}>
        <h3 className={styles.projectTitle}>{project.title}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag, index) => (
            <span key={index} className={styles.projectTag}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projets = () => {
  // Données des projets avec emojis au lieu d'images
  const projects = [
    {
      id: 1,
      title: "Root:_ Core",
      description: "Système d'intelligence artificielle avancé basé sur l'architecture de transformers. Optimisé pour le traitement du langage naturel et la compréhension contextuelle.",
      emoji: "🧠", // Cerveau pour l'IA
      tags: ["AI", "NLP", "Transformers"]
    },
    {
      id: 2,
      title: "ChatRoot Interface",
      description: "Interface conversationnelle permettant d'interagir avec Root:_ via une interface simple et intuitive. Compatible avec les appareils mobiles et de bureau.",
      emoji: "💬", // Bulle de dialogue pour le chat
      tags: ["UI/UX", "React", "Responsive"]
    },
    {
      id: 3,
      title: "API Root",
      description: "API permettant d'intégrer les capacités de Root:_ dans des applications tierces. Documentation complète et exemples d'intégration disponibles.",
      emoji: "🔌", // Prise électrique pour l'API/connexion
      tags: ["API", "Documentation", "Integration"]
    },
    {
      id: 4,
      title: "Root:_ Assistant",
      description: "Extension de navigateur offrant un accès rapide à Root:_ directement depuis votre navigateur. Recherche contextuelle et suggestions intelligentes.",
      emoji: "🔍", // Loupe pour la recherche/assistant
      tags: ["Extension", "Chrome", "Firefox"]
    }
  ];

  return (
    <div className={styles.aboutContainer}>
      <h2>Nos Projets</h2>
      <p>
        Chez Root:_, nous développons des technologies d'intelligence artificielle avancées visant à repousser les limites de l'interaction homme-machine. Découvrez nos projets principaux ci-dessous.
      </p>

      <div className={styles.projectGrid}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h2>Contribuer</h2>
      <p>
        Root:_ est un projet open-source qui dépend de la contribution de développeurs passionnés. Si vous souhaitez participer au développement, consultez notre dépôt GitHub ou faites un don pour soutenir le projet.
      </p>
      <a href="/donate" className={styles.donateButton}>Soutenir le projet</a>

      <h2>Technologies</h2>
      <p>
        Nos projets sont développés avec les technologies les plus avancées dans le domaine de l'intelligence artificielle et du développement web:
      </p>
      <ul>
        <li>Modèles de langage basés sur l'architecture Transformer</li>
        <li>React et Next.js pour les interfaces utilisateur</li>
        <li>APIs REST et GraphQL</li>
        <li>Python et TensorFlow pour l'apprentissage automatique</li>
        <li>Déploiement sur infrastructures cloud scalables</li>
      </ul>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Logo size="medium" />
      </div>
    </div>
  );
};

export default Projets;