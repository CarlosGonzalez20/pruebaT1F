import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = ({ onBack, onLoginClick, onRegisterSuccess, apiBaseUrl, setApiResponse }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      setApiResponse({ error: 'Las contraseñas no coinciden' });
      return;
    }
    
    setIsLoading(true); // Usar estado local
    
    try {
      const submitData = {
        ...formData,
        rol: 'usuario'
      };
      delete submitData.confirmPassword;
      
      const response = await fetch(`${apiBaseUrl}/registro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submitData)
      });
      
      const data = await response.json();
      setApiResponse(data);
      
      if (data.success) {
        const loginResponse = await fetch(`${apiBaseUrl}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        });
        
        const loginData = await loginResponse.json();
        setApiResponse(loginData);
        
        if (loginData.success) {
          onRegisterSuccess(loginData.data.token, loginData.data.usuario);
        }
      }
    } catch (error) {
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false); // Usar estado local
    }
  };
  
  return (
    <div className="registration-form-container">
      <div className="form-header">
        <button onClick={onBack} className="back-btn">← Volver</button>
        <h2>Crear Cuenta</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre Completo</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            placeholder="Tu nombre completo"
            disabled={isLoading}
          />
        </div>
        
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
            placeholder="Mínimo 6 caracteres"
            minLength="6"
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            placeholder="Repite tu contraseña"
            minLength="6"
            disabled={isLoading}
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
        </button>
      </form>
      
      <div className="auth-footer">
        <p>¿Ya tienes una cuenta? 
          <button 
            onClick={onLoginClick} 
            className="link-btn"
            disabled={isLoading}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;