import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './notFound.css';

const Error404 = memo(() => {
  const navigate = useNavigate();

  // Memoizar la función de navegación
  const handleGoHome = useCallback(() => navigate('/'), [navigate]);

  return (
    <main className="error-container" aria-labelledby="error-title">
      <div className="error-content">
        <header className="error-header">
          <svg class="pharmacy-icon" width="70px" height="70px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 12H15M12 8.99999V15M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1 id="error-title">404</h1>
          <h2>Página no encontrada</h2>
        </header>
        
        <p className="error-message">
          Lo sentimos, la página que buscas no está disponible. 
          Parece que te has perdido en nuestro laboratorio...
        </p>
        
        <div className="error-animation" aria-hidden="true">
          <svg className="pill-svg" viewBox="0 0 64 64">
            <g>
              <path fill="#aed681" d="M32.744,56.709C29.34,60.121,24.813,62,20,62c-9.925,0-18-8.074-18-18c0-4.813,1.879-9.34,5.294-12.746
                l11.27-11.276l25.46,25.46L32.744,56.709z"/>
              <path fill="#136fba" d="M56.65,32.817L45.438,44.023L19.977,18.562L31.18,7.353c0.083-0.06,0.163-0.127,0.239-0.201
                C34.811,3.83,39.278,2,44,2c9.925,0,18,8.074,18,18c0,4.721-1.829,9.189-5.151,12.581C56.775,32.656,56.709,32.734,56.65,32.817z"
              />
              <g>
                <path fill="#394240" d="M64,20C64,8.953,55.047,0,44,0c-5.449,0-10.375,2.191-13.98,5.723L30,5.703L5.879,29.84
                  C2.25,33.461,0,38.465,0,44c0,11.047,8.953,20,20,20c5.535,0,10.539-2.25,14.16-5.879L58.297,34l-0.02-0.02
                  C61.809,30.375,64,25.445,64,20z M32.744,56.709C29.34,60.121,24.813,62,20,62c-9.925,0-18-8.074-18-18
                  c0-4.813,1.879-9.34,5.294-12.746l11.27-11.276l25.46,25.46L32.744,56.709z M56.65,32.817L45.438,44.023L19.977,18.562
                  L31.18,7.353c0.083-0.06,0.163-0.127,0.239-0.201C34.811,3.83,39.278,2,44,2c9.925,0,18,8.074,18,18
                  c0,4.721-1.829,9.189-5.151,12.581C56.775,32.656,56.709,32.734,56.65,32.817z"/>
                <path fill="#394240" d="M44,6c-0.553,0-1,0.447-1,1s0.447,1,1,1c6.627,0,12,5.373,12,12c0,0.553,0.447,1,1,1s1-0.447,1-1
                  C58,12.268,51.732,6,44,6z"/>
              </g>
            </g>
          </svg>
        </div>
        
        <button 
          className="home-button"
          onClick={handleGoHome}
          aria-label="Volver a la página de inicio"
        >
          Volver al Inicio
        </button>
      </div>
    </main>
  );
});

export default Error404;