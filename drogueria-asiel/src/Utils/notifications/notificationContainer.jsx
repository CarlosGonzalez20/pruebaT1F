import React from 'react';
import useNotification from '../../Hooks/useNotification/useNotification';
import './notificationContainer.css';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  const getIconByType = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '💬';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notification-container">
      {notifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <div className="notification-icon">
            {getIconByType(notification.type)}
          </div>
          <div className="notification-content">
            <div className="notification-title">
              {notification.title || 
                (notification.type === 'success' ? 'Éxito' : 
                 notification.type === 'error' ? 'Error' : 
                 notification.type === 'warning' ? 'Advertencia' : 'Información')}
            </div>
            <div className="notification-message">{notification.message}</div>
          </div>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation();
              removeNotification(notification.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;