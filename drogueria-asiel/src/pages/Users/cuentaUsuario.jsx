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

function ApiTestApp() {
  const [currentView, setCurrentView] = useState('login');
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://dasa-api-xrec.onrender.com';
  const [apiBaseUrl] = useState(`${API_BASE_URL}/usuarios`);
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
    login(token, userData); // Usar el método login del hook
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    logout(); // Usar el método logout del hook
    setApiResponse(null);
    setCurrentView('login');
    navigate('/');
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
              // Quitar setIsLoading de aquí
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
              // Quitar setIsLoading de aquí
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
        return (
          <Suspense fallback={<Loader />}>
            <AdminPanel 
              user={currentUser}
              authToken={authToken}
              apiBaseUrl={apiBaseUrl}
              onBack={() => navigateTo('dashboard')}
              setApiResponse={setApiResponse}
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
        <h1>Panel de Pruebas API Usuarios</h1>
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
          <h3>🔧 Panel de Debug (Solo Admin)</h3>
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

export default ApiTestApp;