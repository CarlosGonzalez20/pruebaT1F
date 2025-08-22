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
      try {
        setCurrentUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout(); // Limpiar datos corruptos
      }
    }
    setIsLoading(false);
  }, []);

  const login = (token, userData) => {
    // ✅ Asegurar que userData tenga la estructura completa
    const completeUserData = {
      id: userData.id || userData._id,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol || 'usuario', // Valor por defecto
      avatar: userData.avatar || null,
      // Agrega otros campos necesarios
    };
    
    setAuthToken(token);
    setCurrentUser(completeUserData);
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(completeUserData));
    
    console.log('✅ Login exitoso - User:', completeUserData);
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