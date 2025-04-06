import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Vérifier s'il y a un utilisateur déjà connecté (cookie ou localStorage)
    const checkLoggedInUser = async () => {
      try {
        // Récupérer les données utilisateur depuis le localStorage ou un cookie
        const storedUser = localStorage.getItem('root_user');
        
        if (storedUser) {
          // Si l'utilisateur est stocké localement, valider l'authentification avec le backend
          const response = await fetch('/api/auth/validate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: JSON.parse(storedUser).id }),
            credentials: 'include' // Pour envoyer les cookies
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token invalide ou expiré, supprimer les données locales
            localStorage.removeItem('root_user');
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Erreur lors de la vérification de l\'authentification:', err);
        setError('Problème de connexion au serveur');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoggedInUser();
  }, []);

  const login = async (provider) => {
    try {
      setIsLoading(true);
      setError(null);

      // En fonction du provider (Google, email/password, etc.)
      if (provider === 'google') {
        // Redirection vers le endpoint d'authentification Google
        window.location.href = '/api/auth/google';
        return; // La redirection va interrompre l'exécution
      }

      // Autres providers pourraient être ajoutés ici
      
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Échec de la connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Appel au backend pour invalider la session
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // Supprimer les données locales
        localStorage.removeItem('root_user');
        setUser(null);
      } else {
        throw new Error('Problème lors de la déconnexion');
      }
    } catch (err) {
      console.error('Erreur de déconnexion:', err);
      setError('Problème lors de la déconnexion');
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => {
    setError(null);
  };

  // Calcul de la valeur du contexte
  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    login,
    logout,
    resetError
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;