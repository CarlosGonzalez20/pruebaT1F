import React, { useState, useEffect } from 'react';
import './RegistrationForm.css';
import useNotification from '../../../Hooks/useNotification/useNotification';

const RegistrationForm = ({ onBack, onLoginClick, onRegisterSuccess, apiBaseUrl }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('empty');
  
  // Usar el hook de notificaciones
  const { addNotification } = useNotification();
  
  useEffect(() => {
    const calculateStrength = () => {
      const pass = formData.password;
      if (pass.length === 0) {
        return 'empty';
      }
      if (pass.length < 6) {
        return 'weak';
      }

      const hasNumber = /(?=.*\d)/.test(pass);
      const hasLower = /(?=.*[a-z])/.test(pass);
      const hasUpper = /(?=.*[A-Z])/.test(pass);

      if (hasNumber && hasLower && hasUpper) {
        return 'strong';
      } else if (pass.length >= 6) {
        return 'medium';
      } else {
        return 'weak';
      }
    };

    setPasswordStrength(calculateStrength());
  }, [formData.password]);

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
      addNotification({
        type: 'error',
        title: 'Error de validación',
        message: 'Las contraseñas no coinciden'
      });
      return;
    }
    
    setIsLoading(true);
    
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
      
      if (data.success) {
        addNotification({
          type: 'success',
          title: '¡Registro exitoso!',
          message: data.message || 'Usuario registrado correctamente'
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Error en el registro',
          message: data.message || 'Error al registrar usuario'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo conectar con el servidor. Intenta nuevamente.'
      });
    } finally {
      setIsLoading(false);
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
            autoComplete='email'
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-input-container">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Mínimo 6 caracteres"
              minLength="6"
              autoComplete='new-password'
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="La contraseña debe contener al menos un número, una letra minúscula, una letra mayúscula y tener al menos 6 caracteres."
              disabled={isLoading}
            />
            {/* ✅ Indicador de Emoción */}
            <span className="password-emoji">
              {passwordStrength === 'empty' && '😑'}
              {passwordStrength === 'weak' && '😒'}
              {passwordStrength === 'medium' && '🤔'}
              {passwordStrength === 'strong' && '🥲'}
            </span>
          </div>
          <small className="help-text">
            La contraseña debe tener al menos 6 caracteres, incluir una mayúscula, una minúscula y un número.
          </small>
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
            autoComplete='new-password'
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