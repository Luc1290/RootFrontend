import styles from './Login.module.css';

export default function Login() {
  const backendUrl = "https://api.rootai.fr";

  const handleLogin = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/google-login-url`, {
        method: "GET",
        credentials: "include"
      });
  
      if (!response.ok) {
        throw new Error(`Erreur API : ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Aucune URL reçue depuis le backend !");
      }
    } catch (error) {
      console.error("Erreur de login Google :", error.message || error);
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


