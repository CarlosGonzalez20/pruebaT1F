import React, { useState } from 'react';
import './LoginForm.css';
import useNotification from '../../../Hooks/useNotification/useNotification';

const LoginForm = ({ onLoginSuccess, onRegisterClick, apiBaseUrl }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const { addNotification } = useNotification();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Sesión iniciada correctamente'
        });
        onLoginSuccess(data.data.token, data.data.usuario);
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Credenciales incorrectas'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Error de conexión con el servidor'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverPassword = async () => {
    if (!recoveryEmail) {
      addNotification({
        type: 'error',
        message: 'Por favor ingresa tu correo electrónico'
      });
      return;
    }

    setIsRecovering(true);

    try {
      const response = await fetch(`${apiBaseUrl}/recuperar-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail })
      });

      const data = await response.json();

      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message || 'Se ha enviado una nueva contraseña a tu correo'
        });
        setRecoveryEmail('');
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Error al recuperar la contraseña'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        message: 'Error de conexión con el servidor'
      });
    } finally {
      setIsRecovering(false);
    }
  };

  return (
    <div className="login-form-container">
      <div className="form-header">
        <button onClick={() => window.history.back()} className="back-btn">← Volver</button>
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

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      {/* Sección de recuperación de contraseña */}
      <div className="recovery-section">
        <p>¿Olvidaste tu contraseña?</p>
        <div className="recovery-input">
          <input
            type="email"
            placeholder="Ingresa tu correo electrónico"
            value={recoveryEmail}
            onChange={(e) => setRecoveryEmail(e.target.value)}
            disabled={isRecovering}
          />
          <button 
            onClick={handleRecoverPassword}
            className="recovery-btn"
            disabled={isRecovering}
          >
            {isRecovering ? 'Enviando...' : 'Recuperar Contraseña'}
          </button>
        </div>
        <small className="recovery-note">
          Te enviaremos una contraseña temporal. Por seguridad, cámbiala después de iniciar sesión.
        </small>
      </div>

      <div className="auth-footer">
        <p>¿No tienes una cuenta? 
          <button onClick={onRegisterClick} className="link-btn">
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;