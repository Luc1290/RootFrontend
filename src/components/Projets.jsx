import React from 'react';
import styles from './Projets.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h2>ROOT — Plus qu'un assistant, un projet vivant</h2>

      <p><strong>Root</strong> est un assistant conversationnel personnel, en ligne, évolutif. Développé de zéro en <strong>React (.jsx)</strong> pour le front-end, avec un back-end en <strong>C# .NET</strong>, il est connecté à l’IA Claude via API, et stocke les conversations dans une base de données <strong>PostgreSQL</strong>.</p>

      <p>C’est un projet <strong>full stack</strong> codé à la main, sans outil no-code, avec une vision claire : construire, pas juste connecter.</p>

      <h2>Pourquoi Root est différent ?</h2>
      <ul>
        <li><strong>Front-end en React</strong> : composants .jsx pour une interface fluide, responsive et maintenable</li>
        <li><strong>Design global via app.css</strong> : simple, cohérent et responsive</li>
        <li><strong>Back-end en C# .NET</strong> : robuste, sécurisé, évolutif</li>
        <li><strong>Base de données PostgreSQL</strong> : connectée à Railway : stockage structuré des messages pour mémoire future</li>
        <li><strong>Connexion API à Claude (Anthropic)</strong> : pas de traitement intermédiaire</li>
        <li><strong>Hébergement décentralisé</strong> : Railway (Backend/DB/Frontend), domaine chez Gandi</li>
        <li><strong>Respect de la vie privée</strong> : pas de tracking, pas de revente de données</li>
      </ul>

      <h2>Ce que Root fait aujourd’hui</h2>
      <ul>
        <li>Chat IA fluide, responsive</li>
        <li>Indépendant : développé de A à Z sans outil préfabriqué, avec un contrôle total sur l’architecture, le code, la gestion des données.</li>
        <li>Stockage conversationnel PostgreSQL</li>
        <li>Interface publique et admin pour moi avec Logs des erreurs</li>
        <li>Backend sécurisé, prêt à évoluer</li>
        <li>Connexion Claude optimisée</li>
        <li>Architecture découpée pour être maintenable et extensible</li>
      </ul>

      <h2>Ce que Root vise demain</h2>
      <ul>
        <li>Mémoire longue dynamique (via PostgreSQL) avec classification des sujets</li>
        <li>Apprentissage actif (feedback utilisateur)</li>
        <li>Reconnaissance d’entités nommées (NER)</li>
        <li>Reconnaissance d’intentions (NLU)</li>
        <li>Reconnaissance d’émotions (NLU)</li>
        <li>Reconnaissance de contexte (NLG)</li>
        <li>Reconnaissance de tonalité (NLG)</li>
        <li>Reconnaissance de langage (NLG)</li>
        <li>Reconnaissance de visages (API tiers)</li>
        <li>Reconnaissance de voix (API tiers)</li>
        <li>Analyse contextuelle (intention, émotion, signaux faibles)</li>
        <li>Système multi-LLM (Claude, GPT, entrainement de son propre LLM…)</li>
        <li>API publique pour intégration externe</li>
        <li>Interface publique enrichie (statistiques, personnalisation)</li>
        <li>Interface admin enrichie (statistiques, gestion des conversations)</li>
        <li>Modules évolutifs connectés à différents services</li>
        <li>Persistance par utilisateur (token d’identification à venir)</li>
      </ul>

      <h2>Un projet personnel, soutenu par vous</h2>
        <ul>
        <li>Root est un projet 100 % indépendant, sans entreprise derrière, sans sponsor, sans financement.</li>
        <li>Tout est actuellement financé par moi-même :</li>
        <li>L’hébergement (backend, base de données, front-end)</li>
        <li>Les appels à l’IA Claude, facturés à chaque message envoyé</li>
        <li>Le nom de domaine</li>
        <li>Le développement complet, fait sur mon temps personnel</li>
        <li>Votre utilisation est gratuite, mais chaque interaction a un coût réel.</li>
        <li>Si vous appréciez l’expérience, si vous croyez dans ce projet ou si vous voulez l’aider à grandir, vous pouvez m’aider à le soutenir.</li>
        </ul>

        <a className={styles.donateButton} href="https://tonlienversdons.fr" target="_blank" rel="noopener noreferrer">
        → Soutenir Root
      </a>
      <br />
      <a className={styles.donateButton} href="mailto:RootIA1290@gmail.com" target="_blank" rel="noopener noreferrer">
        → Contactez moi pour plus d'informations
      </a>
    </div>
  );
};

export default About;
