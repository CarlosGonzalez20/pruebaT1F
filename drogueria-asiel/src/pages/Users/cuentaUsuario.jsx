import React, { useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import './cuentaUsuario.css';
import Loader from '../../components/loader/loader';
import { useAuth } from '../../Hooks/useAuth/useAuth';

// Componentes lazy-loaded...
const LoginForm = lazy(() => import('../../components/Usuarios/loginForm/LoginForm'));
const RegistrationForm = lazy(() => import('../../components/Usuarios/registrationForm/RegistrationForm'));
const UserDashboard = lazy(() => import('../../components/Usuarios/userDashboard/UserDashboard'));
const AdminPanel = lazy(() => import('../../components/Usuarios/adminPanel/AdminPanel'));
const GestionUsuarios = lazy(() => import('../../components/Usuarios/adminPanel/gestionUsuarios/gestionUsuarios'));

function CuentaUsuario() {
  const [currentView, setCurrentView] = useState('login');
  const [adminSection, setAdminSection] = useState('menu'); // Nueva state para secciones admin

  // Configuración de API
  let API_BASE_URL;
  if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) {
    API_BASE_URL = import.meta.env.VITE_API_URL;
  } else {
    API_BASE_URL = 'http://localhost:3000';
  }
  const apiBaseUrl = `${API_BASE_URL}/usuarios`;
  const [apiResponse, setApiResponse] = useState(null);
  const navigate = useNavigate();
  
  const { authToken, currentUser, isLoading: authLoading, login, logout } = useAuth();

  // Determinar la vista inicial basada en la autenticación
  React.useEffect(() => {
    if (authToken && currentUser) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  }, [authToken, currentUser]);

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLoginSuccess = (token, userData) => {
    login(token, userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logout();
    setApiResponse(null);
    setCurrentView('login');
    navigate('/');
  };

  const handleAdminSectionChange = (section) => {
    setAdminSection(section);
  };

  const renderCurrentView = () => {
    if (authLoading) {
      return <Loader />;
    }

    switch (currentView) {
      case 'login':
        return (
          <Suspense fallback={<Loader />}>
            <LoginForm 
              onBack={handleBackToHome}
              onLoginSuccess={handleLoginSuccess}
              onRegisterClick={() => navigateTo('register')}
              apiBaseUrl={apiBaseUrl}
              setApiResponse={setApiResponse}
            />
          </Suspense>
        );
      
      case 'register':
        return (
          <Suspense fallback={<Loader />}>
            <RegistrationForm 
              onBack={handleBackToHome}
              onLoginClick={() => navigateTo('login')}
              onRegisterSuccess={handleLoginSuccess}
              apiBaseUrl={apiBaseUrl}
              setApiResponse={setApiResponse}
            />
          </Suspense>
        );
      
      case 'dashboard':
        return (
          <Suspense fallback={<Loader />}>
            <UserDashboard 
              user={currentUser}
              authToken={authToken}
              apiBaseUrl={apiBaseUrl}
              onLogout={handleLogout}
              setApiResponse={setApiResponse}
              onAdminPanelClick={() => navigateTo('admin')}
            />
          </Suspense>
        );
      
      case 'admin':
        // Verificar permisos para el panel de administración
        if (!currentUser || (currentUser.rol !== 'admin' && currentUser.rol !== 'moderador')) {
          return (
            <div className="access-denied-panel">
              <h2>Acceso Restringido</h2>
              <p>No tienes permisos para acceder al panel de administración.</p>
              <button onClick={() => navigateTo('dashboard')} className="back-btn">
                ← Volver al Dashboard
              </button>
            </div>
          );
        }
        
        return (
          <Suspense fallback={<Loader />}>
            <AdminPanel 
              user={currentUser}
              authToken={authToken}
              apiBaseUrl={apiBaseUrl}
              onBack={() => navigateTo('dashboard')}
              setApiResponse={setApiResponse}
              currentSection={adminSection}
              onSectionChange={handleAdminSectionChange}
            />
          </Suspense>
        );
      
      default:
        return (
          <Suspense fallback={<Loader />}>
            <LoginForm 
              onBack={handleBackToHome}
              onLoginSuccess={handleLoginSuccess}
              onRegisterClick={() => navigateTo('register')}
              apiBaseUrl={apiBaseUrl}
              setApiResponse={setApiResponse}
            />
          </Suspense>
        );
    }
  };

  return (
    <div className="api-test-app">
      <header className="app-header">
        <h1>Centro de administración</h1>
        {currentUser && (
          <div className="user-info">
            <span>Hola, {currentUser.nombre}</span>
            <span className="user-role">{currentUser.rol}</span>
            <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
          </div>
        )}
      </header>

      <main className="app-main">
        {renderCurrentView()}
      </main>

      {/* PANEL SOLO PARA ADMINS */}
      {currentUser && currentUser.rol === 'admin' && (
        <aside className="api-response-panel">
          <h3>🔧 Panel de Debug TEMPORAL (Solo Admin)</h3>
          <div className="response-content">
            {apiResponse ? (
              <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
            ) : (
              <p>Realiza una operación para ver los resultados de API</p>
            )}
          </div>
        </aside>
      )}
    </div>
  );
}

export default CuentaUsuario;