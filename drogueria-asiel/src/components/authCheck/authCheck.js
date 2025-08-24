import { useEffect } from 'react';
import { useAuth } from '../../Hooks/useAuth/useAuth';

const AuthCheck = ({ children }) => {
  const { authToken, logout } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      if (authToken) {
        try {
          const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
          
          const response = await fetch(`${API_BASE_URL}/usuarios/verify`, {
            headers: { 'Authorization': `Bearer ${authToken}` }
          });
          
          const data = await response.json();
          
          if (!response.ok || !data.success) {
            console.log('Token inválido o expirado:', data.message);
            logout();
          }
        } catch (error) {
          console.error('Error de red verificando autenticación:', error);
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 300000);
    
    return () => clearInterval(interval);
  }, [authToken, logout]);

  return children;
};

export default AuthCheck;