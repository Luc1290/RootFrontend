import styles from './Login.module.css';

export default function Login() {
  const backendUrl = "https://api.rootai.fr";

  const handleLogin = () => {
    fetch(`${backendUrl}/api/auth/google-login`, {
      method: "GET",
      credentials: "include"
    })
    .then(res => {
      if (res.redirected) {
        window.location.href = res.url;
      }
    }); 
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
