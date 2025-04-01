import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("Connexion en cours...");

  useEffect(() => {
    // Vérifier s'il y a un paramètre d'erreur dans l'URL
    const params = new URLSearchParams(location.search);
    const error = params.get('error');
    
    if (error) {
      setMessage(`Erreur d'authentification: ${error}`);
      // Rediriger vers login après un délai
      setTimeout(() => navigate('/login'), 3000);
      return;
    }

    const verifyAuth = async () => {
      try {
        const response = await fetch("https://api.rootai.fr/api/me", {
          credentials: "include",
        });

        if (response.ok) {
          console.log("Utilisateur connecté !");
          navigate("/");
        } else {
          console.log("Utilisateur non authentifié.");
          navigate("/login?error=session_expired");
        }
      } catch (error) {
        console.error("Erreur pendant la vérification :", error);
        navigate("/login?error=server_error");
      }
    };

    verifyAuth();
  }, [navigate, location]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>{message}</h2>
      <p>Merci de patienter pendant la vérification de votre session.</p>
    </div>
  );
}