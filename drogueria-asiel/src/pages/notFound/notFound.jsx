import React from 'react';
import { useNavigate } from 'react-router-dom';
import './notFound.css';

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-header">
          <svg className="pharmacy-icon" viewBox="0 0 24 24">
            <path d="M12,2L4,5V11C4,16.55 7.84,21.74 12,23C16.16,21.74 20,16.55 20,11V5L12,2M12,7H13V10H16V11H13V14H12V11H9V10H12V7Z" />
          </svg>
          <h1>404</h1>
          <h2>Página no encontrada</h2>
        </div>
        
        <p className="error-message">
          Lo sentimos, la página que buscas no está disponible. 
          Parece que te has perdido en nuestro laboratorio...
        </p>
        
        <div className="error-animation">
          <div className="molecule">
            <div className="atom"></div>
            <div className="atom"></div>
            <div className="atom"></div>
            <div className="bond"></div>
            <div className="bond"></div>
          </div>
        </div>
        
        <button 
          className="home-button"
          onClick={() => navigate('/')}
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Error404;