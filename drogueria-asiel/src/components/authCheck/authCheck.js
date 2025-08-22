// components/AuthCheck.js
import { useEffect } from 'react';
import { useAuth } from '../../Hooks/useAuth/useAuth';

const AuthCheck = ({ children }) => {
  const { authToken, currentUser, logout } = useAuth();

  useEffect(() => {
    // Verificar periodicamente si el token sigue siendo válido
    const checkAuth = async () => {
      if (authToken) {
        try {
          const response = await fetch('http://localhost:3000/usuarios/verify', {
            headers: { 'Authorization': `Bearer ${authToken}` }
          });
          
          if (!response.ok) {
            logout(); // Token inválido
          }
        } catch (error) {
          console.error('Error verificando autenticación:', error);
        }
      }
    };

    const interval = setInterval(checkAuth, 300000); // Verificar cada 5 minutos
    return () => clearInterval(interval);
  }, [authToken, logout]);

  return children;
};

export default AuthCheck;