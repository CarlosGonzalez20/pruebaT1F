import React, { useState, useEffect } from 'react';
import useNotification from '../../../../Hooks/useNotification/useNotification';
import './gestionUsuarios.css';

const GestionUsuarios = ({ user, authToken, apiBaseUrl, setApiResponse }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('');
  const [newRole, setNewRole] = useState('moderador'); // Cambiado a moderador por defecto
  const [usuarios, setUsuarios] = useState([]);
  const [filtroRol, setFiltroRol] = useState('todos');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [historialRoles, setHistorialRoles] = useState(null);
  
  const { addNotification } = useNotification();

  // Verificar permisos - solo admin puede acceder
  if (!user || user.rol !== 'admin') {
    return (
      <div className="gestion-usuarios">
        <div className="access-denied">
          <h2>Acceso Restringido</h2>
          <p>No tienes permisos para acceder a la gestión de usuarios.</p>
        </div>
      </div>
    );
  }

  // Cargar usuarios automáticamente al montar el componente
  useEffect(() => {
    cargarTodosLosUsuarios();
  }, []);

  // Filtrar usuarios cuando cambia el filtro o la lista de usuarios
  useEffect(() => {
    if (filtroRol === 'todos') {
      setUsuariosFiltrados(usuarios);
    } else {
      setUsuariosFiltrados(usuarios.filter(u => u.rol === filtroRol));
    }
  }, [usuarios, filtroRol]);

  const cargarTodosLosUsuarios = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/admin/usuarios`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsuarios(data.data.usuarios || []);
        setApiResponse(data);
        addNotification({
          type: 'success',
          message: 'Usuarios cargados correctamente'
        });
      } else {
        setApiResponse(data);
        addNotification({
          type: 'error',
          message: data.message || 'Error al cargar usuarios'
        });
      }
    } catch (error) {
      setApiResponse({ error: error.message });
      addNotification({
        type: 'error',
        message: 'Error de conexión al cargar usuarios'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cargarAdministradores = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBaseUrl}/admin/administradores`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setUsuarios(data.data.administradores || []);
        setFiltroRol('todos');
        setApiResponse(data);
        addNotification({
          type: 'success',
          message: 'Administradores cargados correctamente'
        });
      } else {
        setApiResponse(data);
        addNotification({
          type: 'error',
          message: data.message || 'Error al cargar administradores'
        });
      }
    } catch (error) {
      setApiResponse({ error: error.message });
      addNotification({
        type: 'error',
        message: 'Error de conexión al cargar administradores'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cargarModeradores = async () => {
    setIsLoading(true);
    try {
      // Como no hay endpoint específico para moderadores, filtramos los usuarios
      const response = await fetch(`${apiBaseUrl}/admin/usuarios`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      const data = await response.json();
      if (data.success) {
        const moderadores = (data.data.usuarios || []).filter(u => u.rol === 'moderador');
        setUsuarios(moderadores);
        setFiltroRol('moderador');
        setApiResponse({
          success: true,
          data: { usuarios: moderadores }
        });
        addNotification({
          type: 'success',
          message: 'Moderadores cargados correctamente'
        });
      } else {
        setApiResponse(data);
        addNotification({
          type: 'error',
          message: data.message || 'Error al cargar moderadores'
        });
      }
    } catch (error) {
      setApiResponse({ error: error.message });
      addNotification({
        type: 'error',
        message: 'Error de conexión al cargar moderadores'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const adminActions = {
    getStats: async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/estadisticas`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
        if (data.success) {
          addNotification({
            type: 'success',
            message: 'Estadísticas obtenidas correctamente'
          });
        } else {
          addNotification({
            type: 'error',
            message: data.message || 'Error al obtener estadísticas'
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
        addNotification({
          type: 'error',
          message: 'Error de conexión al obtener estadísticas'
        });
      } finally {
        setIsLoading(false);
      }
    },
    
    getUserById: async () => {
      if (!userId) {
        addNotification({
          type: 'warning',
          message: 'Por favor, selecciona un usuario'
        });
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/usuario/${userId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
        if (data.success) {
          addNotification({
            type: 'success',
            message: 'Detalles del usuario obtenidos correctamente'
          });
        } else {
          addNotification({
            type: 'error',
            message: data.message || 'Error al obtener detalles del usuario'
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
        addNotification({
          type: 'error',
          message: 'Error de conexión al obtener detalles del usuario'
        });
      } finally {
        setIsLoading(false);
      }
    },
    
    getRoleHistory: async () => {
      if (!userId) {
        addNotification({
          type: 'warning',
          message: 'Por favor, selecciona un usuario'
        });
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/usuario/${userId}/historial-rol`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
        if (data.success) {
          setHistorialRoles(data.data);
          addNotification({
            type: 'success',
            message: 'Historial de roles obtenido correctamente'
          });
        } else {
          addNotification({
            type: 'error',
            message: data.message || 'Error al obtener historial de roles'
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
        addNotification({
          type: 'error',
          message: 'Error de conexión al obtener historial de roles'
        });
      } finally {
        setIsLoading(false);
      }
    },
    
    setModeratorRole: async () => {
      if (!userId) {
        addNotification({
          type: 'warning',
          message: 'Por favor, selecciona un usuario'
        });
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/usuario/${userId}/rol`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ nuevoRol: 'moderador' })
        });
        const data = await response.json();
        setApiResponse(data);
        if (data.success) {
          addNotification({
            type: 'success',
            message: 'Usuario establecido como moderador correctamente'
          });
          // Recargar usuarios después de cambiar el rol
          cargarTodosLosUsuarios();
        } else {
          addNotification({
            type: 'error',
            message: data.message || 'Error al establecer como moderador'
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
        addNotification({
          type: 'error',
          message: 'Error de conexión al establecer como moderador'
        });
      } finally {
        setIsLoading(false);
      }
    },
    
    promoteToAdmin: async () => {
      if (!userId) {
        addNotification({
          type: 'warning',
          message: 'Por favor, selecciona un usuario'
        });
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/usuario/${userId}/promover`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
        if (data.success) {
          addNotification({
            type: 'success',
            message: 'Usuario promovido a administrador correctamente'
          });
          // Recargar usuarios después de promover
          cargarTodosLosUsuarios();
        } else {
          addNotification({
            type: 'error',
            message: data.message || 'Error al promover a administrador'
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
        addNotification({
          type: 'error',
          message: 'Error de conexión al promover a administrador'
        });
      } finally {
        setIsLoading(false);
      }
    },
    
    demoteToUser: async () => {
      if (!userId) {
        addNotification({
          type: 'warning',
          message: 'Por favor, selecciona un usuario'
        });
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/usuario/${userId}/degradar`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
        if (data.success) {
          addNotification({
            type: 'success',
            message: 'Usuario degradado a usuario regular correctamente'
          });
          // Recargar usuarios después de degradar
          cargarTodosLosUsuarios();
        } else {
          addNotification({
            type: 'error',
            message: data.message || 'Error al degradar a usuario'
          });
        }
      } catch (error) {
        setApiResponse({ error: error.message });
        addNotification({
          type: 'error',
          message: 'Error de conexión al degradar a usuario'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUsuarioSelect = (e) => {
    setUserId(e.target.value);
    setHistorialRoles(null); // Limpiar historial cuando se cambia de usuario
  };

  const getUsuarioSeleccionado = () => {
    return usuarios.find(u => (u._id || u.id) === userId);
  };

  return (
    <div className="gestion-usuarios">
      <div className="gestion-content">
        {/* Sección de Listado de Usuarios con Filtros */}
        <div className="gestion-section">
          <h3>Listado de Usuarios</h3>
          
          <div className="filtros-container">
            <div className="filtro-select">
              <label htmlFor="filtroRol">Filtrar por rol:</label>
              <select
                id="filtroRol"
                value={filtroRol}
                onChange={(e) => setFiltroRol(e.target.value)}
              >
                <option value="todos">Todos los roles</option>
                <option value="usuario">Usuarios</option>
                <option value="moderador">Moderadores</option>
                <option value="admin">Administradores</option>
              </select>
            </div>
          </div>

          <div className="tabla-usuarios-container">
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Verificado</th>
                  <th>Fecha Registro</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map(usuario => (
                  <tr key={usuario._id || usuario.id} className={usuario._id === userId ? 'selected' : ''}>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.email}</td>
                    <td>
                      <span className={`badge-rol ${usuario.rol}`}>
                        {usuario.rol}
                      </span>
                    </td>
                    <td>
                      <span className={`badge-verificado ${usuario.verificado ? 'si' : 'no'}`}>
                        {usuario.verificado ? 'Sí' : 'No'}
                      </span>
                    </td>
                    <td>
                      {usuario.fechaRegistro ? new Date(usuario.fechaRegistro).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {usuariosFiltrados.length === 0 && !isLoading && (
              <div className="sin-datos">
                No hay usuarios para mostrar
              </div>
            )}
          </div>
        </div>

        {/* Sección de Gestión de Usuario Individual */}
        <div className="gestion-section">
          <h3>Gestión de Usuario Individual</h3>
          
          <div className="seleccion-usuario">
            <div className="form-group">
              <label htmlFor="selectUsuario">Seleccionar Usuario:</label>
              <select
                id="selectUsuario"
                value={userId}
                onChange={handleUsuarioSelect}
                className="select-usuario"
              >
                <option value="">Selecciona un usuario</option>
                {usuarios.map(usuario => (
                  <option key={usuario._id || usuario.id} value={usuario._id || usuario.id}>
                    {usuario.nombre} - {usuario.email} ({usuario.rol})
                  </option>
                ))}
              </select>
            </div>
            
            {userId && (
              <div className="info-usuario-seleccionado">
                <p><strong>Usuario seleccionado:</strong> {getUsuarioSeleccionado()?.nombre}</p>
                <p><strong>Rol actual:</strong> <span className={`badge-rol ${getUsuarioSeleccionado()?.rol}`}>
                  {getUsuarioSeleccionado()?.rol}
                </span></p>
              </div>
            )}
            
            <div className="acciones-usuario">
              <button 
                onClick={adminActions.getUserById} 
                className="gestion-btn"
                disabled={!userId}
              >
                Ver Detalles
              </button>
              
              <button 
                onClick={adminActions.getRoleHistory} 
                className="gestion-btn"
                disabled={!userId}
              >
                Ver Historial de Roles
              </button>
            </div>
          </div>

          {/* Mostrar historial de roles si está disponible */}
          {historialRoles && (
            <div className="historial-roles">
              <h4>Historial de Roles</h4>
              <div className="tabla-historial-container">
                <table className="tabla-historial">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Acción</th>
                      <th>Rol Anterior</th>
                      <th>Rol Nuevo</th>
                      <th>Modificado por</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {historialRoles.ultimoCambioRol?.fecha ? 
                          new Date(historialRoles.ultimoCambioRol.fecha).toLocaleString() : 'N/A'}
                      </td>
                      <td>{historialRoles.ultimoCambioRol?.accion || 'Cambio de rol'}</td>
                      <td>
                        <span className={`badge-rol ${historialRoles.ultimoCambioRol?.rolAnterior}`}>
                          {historialRoles.ultimoCambioRol?.rolAnterior}
                        </span>
                      </td>
                      <td>
                        <span className={`badge-rol ${historialRoles.rolActual}`}>
                          {historialRoles.rolActual}
                        </span>
                      </td>
                      <td>
                        {historialRoles.ultimoCambioRol?.por?.nombre || 
                         historialRoles.ultimoCambioRol?.por || 'Sistema'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="gestion-roles">
            <h4>Acciones de Rol</h4>
            
            <div className="acciones-rol">
              <button 
                onClick={adminActions.setModeratorRole} 
                className="gestion-btn"
                disabled={!userId}
              >
                Establecer como Moderador
              </button>
              
              <button 
                onClick={adminActions.promoteToAdmin} 
                className="gestion-btn promote"
                disabled={!userId}
              >
                Promover a Admin
              </button>
              
              <button 
                onClick={adminActions.demoteToUser} 
                className="gestion-btn demote"
                disabled={!userId}
              >
                Degradar a Usuario
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas */}
        <div className="gestion-section">
          <h3>Estadísticas del Sistema</h3>
          <h4>Próximamente en el apartado de estadísticas</h4>
          <div className="gestion-actions">
            <button onClick={adminActions.getStats} className="gestion-btn">
              Obtener Estadísticas
            </button>
          </div>
        </div>

        {isLoading && <div className="loading-indicator">Cargando...</div>}
      </div>
    </div>
  );
};

export default GestionUsuarios;