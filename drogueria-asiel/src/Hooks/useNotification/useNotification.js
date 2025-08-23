import { useContext } from 'react';
import NotificationContext from '../../Utils/notifications/notificationContext';

const useNotification = () => {
  const context = useContext(NotificationContext);
  
  if (!context) {
    throw new Error('useNotification debe ser usado dentro de un NotificationProvider');
  }
  
  return context;
};

export default useNotification;