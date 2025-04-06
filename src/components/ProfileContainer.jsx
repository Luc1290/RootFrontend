import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import ProfileView from './ProfileView';

const ProfileContainer = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user || !user.id) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Appel à l'API pour récupérer les données du profil
        const response = await fetch(`/api/user/${user.id}`);
        
        if (!response.ok) {
          throw new Error('Impossible de récupérer les données du profil');
        }
        
        const data = await response.json();
        setProfileData(data);
        
        // Récupérer également l'historique des conversations
        const convResponse = await fetch(`/api/user/${user.id}/conversations`);
        
        if (convResponse.ok) {
          const convData = await convResponse.json();
          setConversations(convData);
        }
      } catch (err) {
        console.error('Erreur lors de la récupération du profil:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  const handleDeleteConversation = async (conversationId) => {
    try {
      const response = await fetch(`/api/user/${user.id}/conversations/${conversationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Mettre à jour la liste des conversations après suppression
        setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      } else {
        throw new Error('Impossible de supprimer la conversation');
      }
    } catch (err) {
      console.error('Erreur lors de la suppression:', err);
      setError(err.message);
    }
  };

  const handleClearAllData = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer toutes vos données ? Cette action est irréversible.')) {
      try {
        const response = await fetch(`/api/user/${user.id}/data`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setConversations([]);
          // Rafraîchir les données du profil
          const profileResponse = await fetch(`/api/user/${user.id}`);
          if (profileResponse.ok) {
            const data = await profileResponse.json();
            setProfileData(data);
          }
        } else {
          throw new Error('Impossible de supprimer les données');
        }
      } catch (err) {
        console.error('Erreur lors de la suppression des données:', err);
        setError(err.message);
      }
    }
  };

  return (
    <ProfileView
      user={user}
      profileData={profileData}
      isLoading={isLoading}
      error={error}
      conversations={conversations}
      onDeleteConversation={handleDeleteConversation}
      onClearAllData={handleClearAllData}
    />
  );
};

export default ProfileContainer;