import styles from './Confidentialite.module.css';

export default function Confidentialite() {
  return (
    <div className={styles.aboutContainer}>
      <h2>Politique de confidentialité</h2>
      <p>Root:_ respecte votre vie privée. Nous ne collectons, ne vendons, ni ne partageons vos données personnelles à des tiers non autorisés.</p>
      <ul>
        <li>Seules les informations nécessaires à l'authentification Google sont utilisées (nom, e-mail).</li>
        <li>Aucune donnée personnelle n’est stockée sans votre consentement.</li>
        <li>Les conversations sont stockées uniquement dans un cadre privé, sécurisé, pour améliorer l’expérience utilisateur.</li>
      </ul>
      <p>Pour toute question, contactez-nous : <a href="mailto:rootai1290@gmail.com">rootai1290@gmail.com</a>.</p>
    </div>
  );
}
