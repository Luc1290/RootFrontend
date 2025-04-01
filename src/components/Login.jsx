import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; 

export default function Login() {
  const backendUrl = "https://api.rootai.fr";
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = `${backendUrl}/api/auth/google-login`;
  };

  // Nettoyer l’URL s’il n’y a plus d’erreur
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
              ? 'Erreur de session OAuth. Veuillez réessayer.'
              : error}
          </div>
        )}
        <p>Connecte-toi avec ton compte Google pour commencer l'expérience.</p>
        <button onClick={handleLogin} className={styles.loginBtn}>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
}
