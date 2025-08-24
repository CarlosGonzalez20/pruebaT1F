import { useState, useEffect } from 'react';

// Singleton para manejar el estado global de autenticación
let globalAuthState = {
  authToken: localStorage.getItem('authToken') || '',
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  version: 0
};

const subscribers = new Set();

const notifySubscribers = () => {
  subscribers.forEach(callback => callback());
};

export const useAuthState = () => {
  const [state, setState] = useState(globalAuthState);

  useEffect(() => {
    const callback = () => setState(globalAuthState);
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  }, []);

  const updateAuthState = (newState) => {
    globalAuthState = { ...globalAuthState, ...newState, version: globalAuthState.version + 1 };
    notifySubscribers();
  };

  const login = (token, userData) => {
    const completeUserData = {
      id: userData.id || userData._id,
      nombre: userData.nombre,
      email: userData.email,
      rol: userData.rol || 'usuario',
      avatar: userData.avatar || null,
      verificado: userData.verificado || false,
    };
    
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(completeUserData));
    updateAuthState({ authToken: token, currentUser: completeUserData });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    updateAuthState({ authToken: '', currentUser: null });
  };

  return {
    authToken: state.authToken,
    currentUser: state.currentUser,
    authVersion: state.version,
    login,
    logout
  };
};