import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContextInstance';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false); // Pour éviter les flickers

  const checkAuth = async () => {
    try {
      const res = await fetch("https://api.rootai.fr/api/me", {
        credentials: "include"
      });
      if (res.ok) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsReady(true);
    }
  };

  const logout = async () => {
    try {
      await fetch("https://api.rootai.fr/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
    } catch (err) {
      console.error("Erreur de déconnexion :", err);
    }
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isReady, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
