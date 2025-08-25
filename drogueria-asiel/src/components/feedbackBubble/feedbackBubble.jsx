import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Hooks/useAuth/useAuth';
import useNotification from '../../Hooks/useNotification/useNotification';
import './feedbackBubble.css';

const FeedbackBubble = () => {
  const { authToken, currentUser, authVersion } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ asunto: '', mensaje: '' });
  const { addNotification } = useNotification();

  // ✅ Este efecto se ejecutará cuando cambie la autenticación
  useEffect(() => {
    console.log('Auth changed, re-rendering FeedbackBubble. Version:', authVersion);
    console.log('Current user:', currentUser);
    
    // Cierra el modal si el usuario cierra sesión
    if (!authToken || !currentUser) {
      setIsOpen(false);
    }
  }, [authToken, currentUser, authVersion]);

  const toggleBubble = () => {
    console.log('Toggle bubble clicked. Current user:', currentUser);
    
    if (!currentUser || !currentUser.verificado) {
      handleUnauthenticatedClick();
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleUnauthenticatedClick = () => {
    addNotification({
      type: 'info',
      message: 'Debes iniciar sesión y verificar tu correo para enviar feedback o recomendaciones'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.asunto.trim() || !formData.mensaje.trim()) {
      addNotification({
        type: 'error',
        message: 'Por favor completa todos los campos'
      });
      return;
    }

    setIsLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      const response = await fetch(`${API_BASE_URL}/usuarios/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        addNotification({
          type: 'success',
          message: data.message
        });
        setFormData({ asunto: '', mensaje: '' });
        setIsOpen(false);
      } else {
        addNotification({
          type: 'error',
          message: data.message || 'Error al enviar el feedback'
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

  return (
    <>
      {/* Burbuja flotante */}
      <div 
        className="feedback-bubble" 
        onClick={currentUser && currentUser.verificado ? toggleBubble : handleUnauthenticatedClick}
      >
        <span>💬</span>
        <div className="feedback-tooltip">
          ¿Has encontrado un problema o tienes una recomendación?
        </div>
      </div>

      {/* Modal de feedback */}
      {isOpen && (
        <div className="feedback-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            <div className="feedback-modal-header">
              <h3>Enviar Feedback</h3>
              <button className="feedback-close-btn" onClick={() => setIsOpen(false)}>×</button>
            </div>
            
            <div className="feedback-notice">
              <p>⚠️ <strong>El programa finaliza el 20 de septiembre</strong></p>
              <p>Después de esta fecha, esta funcionalidad se convertirá en un ChatBot</p>
            </div>
            
            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="asunto">Asunto *</label>
                <input
                  type="text"
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  placeholder="Ej: Problema con el inicio de sesión"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  placeholder="Describe detalladamente el problema o tu recomendación..."
                  rows="4"
                  required
                  disabled={isLoading}
                ></textarea>
              </div>

              <div className="feedback-actions">
                <button 
                  type="button" 
                  className="feedback-cancel-btn"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="feedback-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar Feedback'}
                </button>
              </div>
            </form>

            <div className="feedback-info">
              <p>📧 Tu mensaje se enviará desde: <strong>{currentUser?.email}</strong></p>
              <p>⏰ Te responderemos a la brevedad posible.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackBubble;