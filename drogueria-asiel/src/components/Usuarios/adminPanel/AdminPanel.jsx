import React from 'react';
import GestionUsuarios from './gestionUsuarios/gestionUsuarios';
import './AdminPanel.css';

const AdminPanel = ({ user, authToken, apiBaseUrl, onBack, setApiResponse, currentSection, onSectionChange }) => {
  // Verificar permisos
  if (!user || (user.rol !== 'admin' && user.rol !== 'moderador')) {
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

  // Definir las secciones disponibles según el rol
  const availableSections = [
    { id: 'menu', name: 'Menú Principal', icon: '🏠', availableFor: ['admin', 'moderador'] },
    { id: 'usuarios', name: 'Usuarios', icon: '👥', availableFor: ['admin'] },
    { id: 'productos', name: 'Productos', icon: '📦', availableFor: ['admin'] },
    { id: 'comentarios', name: 'Comentarios', icon: '💬', availableFor: ['admin', 'moderador'] },
    { id: 'preguntas', name: 'Preguntas', icon: '❓', availableFor: ['admin', 'moderador'] },
    { id: 'estadisticas', name: 'Estadísticas', icon: '📊', availableFor: ['admin'] },
  ];

  // Filtrar secciones según el rol del usuario
  const filteredSections = availableSections.filter(section => 
    section.availableFor.includes(user.rol)
  );

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'menu':
        return (
          <div className="admin-menu">
            <h2>Panel de Administración</h2>
            <p>Selecciona una sección para gestionar:</p>
            <div className="admin-menu-grid">
              {filteredSections
                .filter(section => section.id !== 'menu')
                .map(section => (
                  <div 
                    key={section.id} 
                    className="menu-item"
                    onClick={() => onSectionChange(section.id)}
                  >
                    <span className="menu-icon">{section.icon}</span>
                    <span className="menu-name">{section.name}</span>
                  </div>
                ))}
            </div>
          </div>
        );
      
      case 'usuarios':
        return (
          <div className="section-content">
            <GestionUsuarios 
              user={user} 
              authToken={authToken} 
              apiBaseUrl={apiBaseUrl} 
              setApiResponse={setApiResponse} 
            />
          </div>
        );
      
      case 'productos':
        return (
          <div className="section-content">
            <h2>Gestión de Productos</h2>
            <p>Esta funcionalidad estará disponible próximamente.</p>
          </div>
        );
      
      case 'comentarios':
        return (
          <div className="section-content">
            <h2>Moderación de Comentarios</h2>
            <p>Esta funcionalidad estará disponible próximamente.</p>
          </div>
        );
      
      case 'preguntas':
        return (
          <div className="section-content">
            <h2>Gestión de Preguntas</h2>
            <p>Esta funcionalidad estará disponible próximamente.</p>
          </div>
        );
      
      case 'estadisticas':
        return (
          <div className="section-content">
            <h2>Estadísticas</h2>
            <p>Esta funcionalidad estará disponible próximamente.</p>
          </div>
        );
      
      default:
        return (
          <div className="section-content">
            <h2>Sección no encontrada</h2>
          </div>
        );
    }
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        {currentSection !== 'menu' ? (
          <button onClick={() => onSectionChange('menu')} className="back-btn">← Menú Principal</button>
        ) : (
          <button onClick={onBack} className="back-btn">← Volver al Dashboard</button>
        )}
      </div>
      
      <div className="admin-content">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default AdminPanel;