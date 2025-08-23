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
  const [originalEmail, setOriginalEmail] = useState(user?.email || '');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      setOriginalEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    if (!authToken || !user) {
      onLogout();
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
          onLogout();
          return;
        }

        const data = await response.json();
        setApiResponse(data);
        
        // Solo actualizar si NO estamos editando
        if (data.success && data.data?.usuario && !isEditingEmail) {
          setProfileData({ 
            nombre: data.data.usuario.nombre,
            email: data.data.usuario.email
          });
          setOriginalEmail(data.data.usuario.email);
        }
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [authToken, apiBaseUrl, setApiResponse, user, onLogout, isEditingEmail]);

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
        setOriginalEmail(data.data.usuario.email);
        setIsEditingEmail(false);
        
        // Mostrar mensaje si cambió el email
        if (profileData.email !== originalEmail) {
          alert('✅ Perfil actualizado. Revisa tu nuevo email para verificar la dirección.');
        }
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
        setOriginalEmail(data.data.usuario.email);
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
    if (isEditingEmail) {
      // Cancelar edición - restaurar el email original
      setProfileData(prev => ({ 
        ...prev, 
        email: originalEmail 
      }));
    }
    setIsEditingEmail(!isEditingEmail);
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