import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

export default function Login() {
  const backendUrl = "https://api.rootai.fr";
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const navigate = useNavigate();

  const handleLogin = () => {
    // ✅ Déclenchement unique du flow OAuth (pas au montage, mais au clic)
    window.location.href = `${backendUrl}/api/auth/google-login`;
  };

  // ✅ Redirection si déjà connecté (appel /api/me une seule fois sans challenge OAuth)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/me`, {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          console.log("✅ Utilisateur déjà connecté :", data);
          navigate("/chatbot");
        } else {
          console.log("Utilisateur non connecté.");
        }
      } catch (err) {
        console.log("Erreur lors de la vérif d'auth :", err);
      }
    };

    checkAuth();
  }, [navigate]);

  // ✅ Nettoyage de l’URL si aucun paramètre d’erreur
  useEffect(() => {
    if (!error && window.location.search) {
      navigate('/login', { replace: true });
    }
  }, [error, navigate]);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.card}>
        <h2>Se connecter</h2>

        {error && (
          <div className={styles.errorMessage}>
            {error === 'The oauth state was missing or invalid'
              ? 'Oups... Problème de session. Essaie à nouveau 🤖'
              : error}
          </div>
        )}

        <p>Connecte-toi avec ton compte Google pour commencer l'expérience Root.</p>
        <button onClick={handleLogin} className={styles.loginBtn}>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
