import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../../Hooks/useNotification/useNotification'; // Paso 1: Importar el hook
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
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    passwordActual: '',
    nuevaPassword: '',
    confirmarPassword: ''
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isChangingPasswordLoading, setIsChangingPasswordLoading] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification(); // Paso 2: Obtener la función del hook

  // Función estable para obtener el perfil
  const fetchProfile = useCallback(async (preventOverwrite = false) => {
    if (!authToken || !user) {
      onLogout();
      return;
    }

    setIsLoadingProfile(true);
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
      
      // Solo actualizar si no estamos editando y no prevenimos la sobrescritura
      if (data.success && data.data?.usuario && !isEditingEmail && !preventOverwrite) {
        setProfileData({ 
          nombre: data.data.usuario.nombre,
          email: data.data.usuario.email
        });
        setOriginalEmail(data.data.usuario.email);
      }
    } catch (error) {
      setApiResponse({ error: error.message });
      addNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo cargar la información del perfil'
      });
    } finally {
      setIsLoadingProfile(false);
      setIsRefreshing(false);
    }
  }, [authToken, apiBaseUrl, setApiResponse, user, onLogout, isEditingEmail, addNotification]);

  // Efecto para cargar el perfil solo al montar el componente
  useEffect(() => {
    fetchProfile();
  }, []); // Solo se ejecuta una vez al montar

  const handleBackToHome = () => navigate('/');

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setIsLoadingProfile(true);
    try {
      // Si no estamos editando el email, restaurar el email original
      // para evitar enviar cambios no deseados
      const dataToSend = isEditingEmail 
        ? profileData 
        : { ...profileData, email: originalEmail };
      
      const response = await fetch(`${apiBaseUrl}/perfil`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(dataToSend)
      });
      
      const data = await response.json();
      setApiResponse(data);
      
      if (data.success && data.data?.usuario) {
        setProfileData({ 
          nombre: data.data.usuario.nombre,
          email: data.data.usuario.email
        });
        setOriginalEmail(data.data.usuario.email);
        
        // Mostrar mensaje si cambió el email
        if (isEditingEmail && profileData.email !== originalEmail) {
          addNotification({
            type: 'success',
            title: 'Perfil actualizado',
            message: 'Revisa tu nuevo email para verificar la dirección.'
          });
        } else {
          addNotification({
            type: 'success',
            message: 'Perfil actualizado correctamente.'
          });
        }
        
        setIsEditingEmail(false);
      } else {
        addNotification({
          type: 'error',
          title: 'Error al actualizar',
          message: data.message || 'No se pudo actualizar el perfil'
        });
      }
    } catch (error) {
      setApiResponse({ error: error.message });
      addNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo actualizar el perfil'
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const handleRefreshProfile = async () => {
    setIsRefreshing(true);
    try {
      await fetchProfile(true); // Prevenir sobrescritura de datos en edición
      addNotification({
        type: 'success',
        message: 'Datos actualizados correctamente'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'No se pudieron refrescar los datos'
      });
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
      addNotification({
        type: 'info',
        message: 'Cambio de email cancelado'
      });
    }
    setIsEditingEmail(!isEditingEmail);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (passwordData.nuevaPassword !== passwordData.confirmarPassword) {
      addNotification({
        type: 'error',
        title: 'Error de validación',
        message: 'Las contraseñas nuevas no coinciden'
      });
      return;
    }

    if (passwordData.nuevaPassword.length < 6) {
      addNotification({
        type: 'error',
        title: 'Error de validación',
        message: 'La nueva contraseña debe tener al menos 6 caracteres'
      });
      return;
    }

    setIsChangingPasswordLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/cambiar-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({
          passwordActual: passwordData.passwordActual,
          nuevaPassword: passwordData.nuevaPassword
        })
      });
      
      const data = await response.json();
      setApiResponse(data);
      
      if (data.success) {
        // Limpiar formulario
        setPasswordData({
          passwordActual: '',
          nuevaPassword: '',
          confirmarPassword: ''
        });
        setIsChangingPassword(false);
        addNotification({
          type: 'success',
          message: 'Contraseña cambiada exitosamente'
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Error al cambiar contraseña',
          message: data.message || 'No se pudo cambiar la contraseña'
        });
      }
    } catch (error) {
      setApiResponse({ error: error.message });
      addNotification({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo cambiar la contraseña'
      });
    } finally {
      setIsChangingPasswordLoading(false);
    }
  };

  const handlePasswordInputChange = (e) => {
    const { id, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const togglePasswordChange = () => {
    if (isChangingPassword) {
      // Cancelar - limpiar formulario
      setPasswordData({
        passwordActual: '',
        nuevaPassword: '',
        confirmarPassword: ''
      });
      addNotification({
        type: 'info',
        message: 'Cambio de contraseña cancelado'
      });
    }
    setIsChangingPassword(!isChangingPassword);
  };

  return (
    <div className="user-dashboard">

    {/* BANNER DE FUNCIONALIDADES EN DESARROLLO - INICIO (FÁCIL DE ELIMINAR) */}
    <div className="features-development-banner">
      <h3>🚀 Próximamente más funcionalidades</h3>
      <p>
        Estamos trabajando para integrar todas las características del sistema. 
        En las próximas semanas añadiremos:
      </p>
      <ul>
        <li>✅ Historial de compras y pedidos</li>
        <li>✅ Carrito de compras</li>
        <li>✅ Sistema de favoritos</li>
        <li>✅ Gestión de direcciones de envío</li>
      </ul>
      <p className="development-timeline">
        <strong>Línea de tiempo:</strong> Todas estas funciones estarán disponibles 
        antes del lanzamiento oficial el 1 de octubre.
      </p>
    </div>
    {/* BANNER DE FUNCIONALIDADES EN DESARROLLO - FIN */}

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
                required
                disabled={isLoadingProfile}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={profileData.email}
                onChange={handleInputChange}
                required
                disabled={!isEditingEmail || isLoadingProfile}
                className={!isEditingEmail ? "disabled-input" : ""}
              />
              {!isEditingEmail && (
                <p className="email-warning">
                  Para cambiar el email, haz clic en "Cambiar Email"
                </p>
              )}
            </div>
            
            {/* Botón siempre visible para actualizar perfil */}
            <button 
              type="submit" 
              className="action-btn"
              disabled={isLoadingProfile}
            >
              {isLoadingProfile ? 'Actualizando...' : 'Actualizar Perfil'}
            </button>
            
            {/* Botón de cancelar solo visible cuando se está editando el email */}
            {isEditingEmail && (
              <button 
                type="button" 
                className="action-btn secondary"
                onClick={toggleEmailEdit}
                disabled={isLoadingProfile}
                style={{ marginTop: '10px' }}
              >
                Cancelar Cambio de Email
              </button>
            )}
          </form>
        </div>

        <div className="dashboard-card">
          <h3>Acciones de Usuario</h3>
          <div className="action-buttons">
            <button 
              onClick={handleRefreshProfile} 
              className="action-btn secondary"
              disabled={isRefreshing || isLoadingProfile}
            >
              {isRefreshing ? 'Refrescando...' : 'Refrescar Datos'}
            </button>

            <button 
              onClick={toggleEmailEdit} 
              className="action-btn secondary"
              disabled={isLoadingProfile || isRefreshing || isEditingEmail}
            >
              Cambiar Email
            </button>

            <button 
              onClick={togglePasswordChange} 
              className="action-btn secondary"
              disabled={isChangingPasswordLoading || isRefreshing}
            >
              {isChangingPassword ? 'Cancelar Cambio' : 'Cambiar Contraseña'}
            </button>
            {(user.rol === 'admin' || user.rol === 'moderador') && (
              <button onClick={onAdminPanelClick} className="action-btn admin">
                Panel de Administración
              </button>
            )}
          </div>

          {/* Formulario de cambio de contraseña */}
          {isChangingPassword && (
            <div className="password-change-section">
              <h4>Cambiar Contraseña</h4>
              <form onSubmit={handlePasswordChange} className="password-form">
                <div className="form-group">
                  <label htmlFor="passwordActual">Contraseña Actual</label>
                  <input
                    type="password"
                    id="passwordActual"
                    value={passwordData.passwordActual}
                    onChange={handlePasswordInputChange}
                    required
                    placeholder="Tu contraseña actual"
                    disabled={isChangingPasswordLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nuevaPassword">Nueva Contraseña</label>
                  <input
                    type="password"
                    id="nuevaPassword"
                    value={passwordData.nuevaPassword}
                    onChange={handlePasswordInputChange}
                    required
                    minLength="6"
                    placeholder="Mínimo 6 caracteres"
                    disabled={isChangingPasswordLoading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmarPassword">Confirmar Nueva Contraseña</label>
                  <input
                    type="password"
                    id="confirmarPassword"
                    value={passwordData.confirmarPassword}
                    onChange={handlePasswordInputChange}
                    required
                    placeholder="Repite la nueva contraseña"
                    disabled={isChangingPasswordLoading}
                  />
                </div>

                <button 
                  type="submit" 
                  className="action-btn"
                  disabled={isChangingPasswordLoading}
                >
                  {isChangingPasswordLoading ? 'Cambiando...' : 'Actualizar Contraseña'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;