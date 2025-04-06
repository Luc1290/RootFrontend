import { createContext } from 'react';

// Définition d'un contexte avec des valeurs par défaut pour faciliter l'autocomplétion
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: () => {},
  logout: () => {},
  resetError: () => {}
});

export default AuthContext;