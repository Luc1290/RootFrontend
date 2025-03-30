import styles from './Conditions.module.css';

export default function Conditions() {
  return (
    <div className={styles.aboutContainer}>
      <h2>Conditions d'utilisation</h2>
      <p>En utilisant Root:_, vous acceptez les règles suivantes :</p>
      <ul>
        <li>Vous utilisez Root:_ à vos propres risques. Le service est fourni tel quel, sans garantie.</li>
        <li>Les réponses générées par l’IA sont informatives, non contractuelles.</li>
        <li>Tout usage abusif ou non conforme peut entraîner la désactivation de l’accès au service.</li>
      </ul>
      <p>Root:_ est un projet expérimental. L’usage implique l’acceptation des règles de confidentialité ci-dessus.</p>
    </div>
  );
}
