// 📁 Login.jsx
import styles from './Login.module.css';

export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/api/auth/google-login"; // Remplace par https://www.rootai.fr en prod
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2>Connexion à Root:_</h2>
        <p>Connecte-toi avec ton compte Google pour commencer l’expérience.</p>
        <button onClick={handleLogin} className={styles.loginBtn}>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}