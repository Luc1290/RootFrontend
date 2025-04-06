import React from 'react';
import styles from './Profile.module.css';

const ProfileView = ({
  user,
  profileData,
  isLoading,
  error,
  conversations,
  onDeleteConversation,
  onClearAllData
}) => {
  if (isLoading) {
    return <div className={styles.profileContainer}>Chargement du profil...</div>;
  }

  if (error) {
    return <div className={styles.profileContainer}>Erreur: {error}</div>;
  }

  if (!user) {
    return <div className={styles.profileContainer}>Veuillez vous connecter pour accéder à votre profil.</div>;
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileHeader}>
        <h1>Profil Utilisateur</h1>
        {user.photoURL && <img src={user.photoURL} alt="Avatar" className={styles.avatar} />}
      </div>
      
      <div className={styles.profileInfo}>
        <h2>Informations personnelles</h2>
        <p><strong>Nom:</strong> {user.displayName || 'Non renseigné'}</p>
        <p><strong>Email:</strong> {user.email || 'Non renseigné'}</p>
        <p><strong>Membre depuis:</strong> {profileData?.createdAt 
          ? new Date(profileData.createdAt).toLocaleDateString() 
          : 'Information non disponible'}</p>
      </div>

      {conversations.length > 0 && (
        <div className={styles.conversationsSection}>
          <h2>Vos conversations récentes</h2>
          <ul className={styles.conversationsList}>
            {conversations.map(conv => (
              <li key={conv.id} className={styles.conversationItem}>
                <div className={styles.conversationHeader}>
                  <span className={styles.conversationTitle}>{conv.title || `Conversation du ${new Date(conv.createdAt).toLocaleDateString()}`}</span>
                  <span className={styles.conversationDate}>{new Date(conv.updatedAt).toLocaleString()}</span>
                </div>
                <p className={styles.conversationPreview}>
                  {conv.lastMessage || 'Aucun message'}
                </p>
                <button 
                  className={styles.deleteButton}
                  onClick={() => onDeleteConversation(conv.id)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.dataControls}>
        <h2>Gestion des données</h2>
        <p>Vous pouvez gérer vos données personnelles et supprimer votre historique.</p>
        <button 
          className={styles.clearDataButton}
          onClick={onClearAllData}
        >
          Supprimer toutes mes données
        </button>
      </div>
    </div>
  );
};

export default ProfileView;