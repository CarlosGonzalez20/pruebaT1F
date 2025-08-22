import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onBack, onLoginSuccess, onRegisterClick, apiBaseUrl, setApiResponse }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false); // Estado local
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Usar estado local
    
    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setApiResponse(data);
      
      if (data.success) {
        onLoginSuccess(data.data.token, data.data.usuario);
      }
    } catch (error) {
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false); // Usar estado local
    }
  };
  
  return (
    <div className="login-form-container">
      <div className="form-header">
        <button onClick={onBack} className="back-btn">← Volver</button>
        <h2>Iniciar Sesión</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="tu@email.com"
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            placeholder="Tu contraseña"
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>
      
      <div className="auth-footer">
        <p>¿No tienes una cuenta? 
          <button 
            onClick={onRegisterClick} 
            className="link-btn"
            disabled={isLoading}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;