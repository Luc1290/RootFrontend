import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("https://api.rootai.fr/api/me", {
        credentials: "include"
      });
      console.log("🔍 Status de /api/me :", res.status);
      setIsAuthenticated(res.ok);
    } catch (err) {
      console.error("❌ Erreur lors du fetch /api/me :", err);
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
