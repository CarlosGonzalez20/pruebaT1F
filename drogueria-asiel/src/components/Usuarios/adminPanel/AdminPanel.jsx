import React, { useState } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ user, authToken, apiBaseUrl, onBack, setApiResponse }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado local
  const [userId, setUserId] = useState('');
  const [newRole, setNewRole] = useState('usuario');
  
  // Verificar permisos
  if (!user || user.rol !== 'admin') {
    return (
      <div className="admin-panel">
        <div className="admin-header">
          <button onClick={onBack} className="back-btn">← Volver</button>
          <h2>Acceso Restringido</h2>
        </div>
        <div className="access-denied">
          <p>No tienes permisos para acceder al panel de administración.</p>
        </div>
      </div>
    );
  }
  
  const adminActions = {
    getAllUsers: async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/usuarios`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
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
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
    getAdmins: async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBaseUrl}/admin/administradores`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        const data = await response.json();
        setApiResponse(data);
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
    getUserById: async () => {
      if (!userId) {
        setApiResponse({ error: 'Por favor, introduce un ID de usuario' });
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
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
    getRoleHistory: async () => {
      if (!userId) {
        setApiResponse({ error: 'Por favor, introduce un ID de usuario' });
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
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
    updateRole: async () => {
      if (!userId) {
        setApiResponse({ error: 'Por favor, introduce un ID de usuario' });
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
          body: JSON.stringify({ nuevoRol: newRole })
        });
        const data = await response.json();
        setApiResponse(data);
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
    promoteToAdmin: async () => {
      if (!userId) {
        setApiResponse({ error: 'Por favor, introduce un ID de usuario' });
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
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    },
    
    demoteToUser: async () => {
      if (!userId) {
        setApiResponse({ error: 'Por favor, introduce un ID de usuario' });
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
      } catch (error) {
        setApiResponse({ error: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <button onClick={onBack} className="back-btn">← Volver al Dashboard</button>
        <h2>Panel de Administración</h2>
      </div>
      
      <div className="admin-content">
        <div className="admin-section">
          <h3>Gestión General</h3>
          <div className="admin-actions">
            <button onClick={adminActions.getAllUsers} className="admin-btn">
              Obtener Todos los Usuarios
            </button>
            
            <button onClick={adminActions.getStats} className="admin-btn">
              Obtener Estadísticas
            </button>
            
            <button onClick={adminActions.getAdmins} className="admin-btn">
              Listar Administradores
            </button>
          </div>
        </div>
        
        <div className="admin-section">
          <h3>Gestión de Usuarios por ID</h3>
          
          <div className="user-id-input">
            <label htmlFor="userId">ID de Usuario:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Selecciona un usuario..."
            />
          </div>
          
          <div className="admin-actions">
            <button onClick={adminActions.getUserById} className="admin-btn">
              Buscar Usuario por ID
            </button>
            
            <button onClick={adminActions.getRoleHistory} className="admin-btn">
              Ver Historial de Roles
            </button>
          </div>
        </div>
        
        <div className="admin-section">
          <h3>Gestión de Roles</h3>
          
          <div className="role-management">
            <div className="form-group">
              <label htmlFor="newRole">Nuevo Rol:</label>
              <select
                id="newRole"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
              >
                <option value="usuario">Usuario</option>
                <option value="moderador">Moderador</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            
            <div className="admin-actions">
              <button onClick={adminActions.updateRole} className="admin-btn">
                Cambiar Rol
              </button>
              
              <button onClick={adminActions.promoteToAdmin} className="admin-btn promote">
                Promover a Admin
              </button>
              
              <button onClick={adminActions.demoteToUser} className="admin-btn demote">
                Degradar a Usuario
              </button>
            </div>
          </div>
        </div>
        {isLoading && <div className="loading-indicator">Cargando...</div>}
      </div>
    </div>
  );
};

export default AdminPanel;