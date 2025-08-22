// hooks/useAuth.js
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [authToken, setAuthToken] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recuperar datos de autenticación del localStorage al cargar
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('currentUser');

    if (token && userData) {
      setAuthToken(token);
      setCurrentUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    setAuthToken(token);
    setCurrentUser(userData);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setAuthToken('');
    setCurrentUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  };

  return {
    authToken,
    currentUser,
    isLoading,
    login,
    logout
  };
};