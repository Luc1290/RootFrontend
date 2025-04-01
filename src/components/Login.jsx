import styles from './Login.module.css';

export default function Login() {
  const backendUrl = "https://api.rootai.fr";

  const handleLogin = async () => {
    try {
      const res = await fetch(`${backendUrl}/api/auth/google-login`, {
        method: "GET",
        credentials: "include",
        redirect: "manual" // ← hyper important
      });

      const redirectUrl = res.headers.get("Location");
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        console.error("Pas de redirection reçue !");
      }
    } catch (err) {
      console.error("Erreur de login :", err);
    }
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
