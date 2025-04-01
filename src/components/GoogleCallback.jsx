import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Connexion en cours...</h2>
      <p>Merci de patienter pendant la vérification de votre session.</p>
    </div>
  );
}
