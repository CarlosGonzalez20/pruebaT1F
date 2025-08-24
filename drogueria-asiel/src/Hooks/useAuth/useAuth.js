import { useAuthState } from '../useAuthState/useAuthState';

export const useAuth = () => {
  const { authToken, currentUser, authVersion, login, logout } = useAuthState();
  
  // Si necesitas mantener el estado de isLoading para compatibilidad
  const isLoading = false; // O puedes implementar lógica real de loading si es necesario
  
  return {
    authToken,
    currentUser,
    isLoading,
    login,
    logout,
    authVersion
  };
};