import styles from './Login.module.css';

export default function Login() {
  const backendUrl = "https://www.rootai.fr"; // Fixé en prod uniquement

  const handleLogin = () => {
    window.location.href = `${backendUrl}/api/auth/google-login`;
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2>Se connecter</h2>
        <p>Connecte-toi avec ton compte Google pour commencer l’expérience.</p>
        <button onClick={handleLogin} className={styles.loginBtn}>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
