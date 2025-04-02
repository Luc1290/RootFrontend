import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupération des infos du profil
    fetch("https://api.rootai.fr/api/Me", { credentials: "include" })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Non authentifié");
      })
      .then(data => {
        console.log("Données reçues:", data); // Debug
        // Création d'un objet utilisateur cohérent
        const user = {
          name: data.Name,
          email: data.Claims && data.Claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]
        };
        setUserData(user);
      })
      .catch(err => {
        console.error("Erreur d'authentification:", err);
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("https://api.rootai.fr/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      navigate("/"); // ou rediriger vers /login si tu préfères
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  if (!userData) return <div>Chargement...</div>;

  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <h2>Profil</h2>
        <p><strong>Nom :</strong> {userData.name || "Non disponible"}</p>
        <p><strong>Email :</strong> {userData.email || "Non disponible"}</p>
        <button onClick={handleLogout} className={styles.logoutBtn}>Se déconnecter</button>
      </div>
    </div>
  );
};

export default Profile;