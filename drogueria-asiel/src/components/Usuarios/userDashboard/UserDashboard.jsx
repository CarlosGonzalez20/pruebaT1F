import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = ({
  user,
  authToken,
  apiBaseUrl,
  onLogout,
  setApiResponse,
  onAdminPanelClick
}) => {
  const [profileData, setProfileData] = useState({ 
    nombre: user?.nombre || '', 
    email: user?.email || '' 
  });
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar si hay token y usuario
    if (!authToken || !user) {
      onLogout(); // Forzar logout si no hay credenciales
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/perfil`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${authToken}` }
        });
        
        if (response.status === 401) {
          // Token inválido o expirado
          onLogout();
          return;
        }

        const data = await response.json();
        setApiResponse(data);
        if (data.success && data.data?.usuario) {
          setProfileData({ 
            nombre: data.data.usuario.nombre,
            email: data.data.usuario.email
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [authToken, apiBaseUrl, setApiResponse, user, onLogout]);

  const handleBackToHome = () => navigate('/');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(profileData)
      });
      const data = await response.json();
      setApiResponse(data);
      if (data.success && data.data?.usuario) {
        setProfileData({ 
          nombre: data.data.usuario.nombre,
          email: data.data.usuario.email
        });
        setIsEditingEmail(false);
      }
    } catch (error) {
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshProfile = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/perfil`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const data = await response.json();
      setApiResponse(data);
      if (data.success && data.data?.usuario) {
        setProfileData({ 
          nombre: data.data.usuario.nombre,
          email: data.data.usuario.email
        });
        setIsEditingEmail(false);
      }
    } catch (error) {
      setApiResponse({ error: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const toggleEmailEdit = () => {
    setIsEditingEmail(!isEditingEmail);
    // Si cancelamos la edición, restauramos el email original
    if (isEditingEmail) {
      setProfileData(prev => ({ ...prev, email: user.email }));
    }
  };

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h2>Panel de Usuario</h2>
        <button onClick={handleBackToHome} className="home-btn">Regresar al inicio</button>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>Información del Perfil</h3>
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                value={profileData.nombre}
                onChange={handleInputChange}
                placeholder="Tu nombre"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={handleInputChange}
                disabled={!isEditingEmail}
                className={isEditingEmail ? '' : 'disabled-input'}
                placeholder="Tu correo electrónico"
              />
              {isEditingEmail && (
                <p className="email-warning">
                  ⚠️ Al cambiar tu email, deberás verificar la nueva dirección
                </p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="action-btn"
              disabled={isEditingEmail && profileData.email === user.email}
            >
              Actualizar Perfil
            </button>
          </form>
        </div>

        <div className="dashboard-card">
          <h3>Acciones de Usuario</h3>
          <div className="action-buttons">
            <button onClick={handleRefreshProfile} className="action-btn secondary">
              Refrescar Datos
            </button>

            <button 
              onClick={toggleEmailEdit} 
              className="action-btn secondary"
            >
              {isEditingEmail ? 'Cancelar Cambio de Email' : 'Cambiar Email'}
            </button>

            {user.rol === 'admin' && (
              <button onClick={onAdminPanelClick} className="action-btn admin">
                Panel de Administración
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;