// NotificationProvider.jsx - Versión segura
import React, { useState, useRef } from 'react';
import NotificationContext from './notificationContext';
import NotificationContainer from './notificationContainer';

// Importa los sonidos (COMENTADOS por ahora)
// import successSound from '../assets/sounds/notification-success.mp3';
// import errorSound from '../assets/sounds/notification-error.mp3';
// import warningSound from '../assets/sounds/notification-warning.mp3';
// import infoSound from '../assets/sounds/notification-info.mp3';

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  // Referencias para los sonidos (COMENTADO)
  // const audioRefs = useRef({
  //   success: new Audio(successSound),
  //   error: new Audio(errorSound),
  //   warning: new Audio(warningSound),
  //   info: new Audio(infoSound)
  // });

  const playSound = (type) => {
    try {
      // COMENTADO por ahora
      // const audio = audioRefs.current[type] || audioRefs.current.info;
      // audio.volume = 0.3;
      // audio.currentTime = 0;
      // audio.play().catch(error => {
      //   console.log('Reproducción de sonido automática bloqueada:', error);
      // });
    } catch (error) {
      console.log('Error reproduciendo sonido:', error);
    }
  };

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = { 
      ...notification, 
      id,
      type: notification.type || 'info',
      autoDismiss: notification.autoDismiss !== false,
      duration: notification.duration || 8000
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Reproducir sonido (COMENTADO por ahora)
    // if (newNotification.type && audioRefs.current[newNotification.type]) {
    //   playSound(newNotification.type);
    // }
    
    if (newNotification.autoDismiss) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;