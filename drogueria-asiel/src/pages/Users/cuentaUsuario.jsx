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

function CuentaUsuaraio() {
  const [currentView, setCurrentView] = useState('login');

  // SOLUCIÓN DEFINITIVA - Configuración a prueba de fallos
  let API_BASE_URL;
  
  // 1. Primero intenta con las variables de entorno de Vite (si usas Vite)
  if (typeof import.meta.env !== 'undefined' && import.meta.env.VITE_API_URL) {
    API_BASE_URL = import.meta.env.VITE_API_URL;
  }
  // 2. Luego intenta con las variables de entorno de CRA (si usas Create React App)
  else if (typeof process.env !== 'undefined' && process.env.REACT_APP_API_URL) {
    API_BASE_URL = process.env.REACT_APP_API_URL;
  }
  // 3. Si estamos en producción (en el dominio de Vercel) y las variables fallaron, usamos el valor hardcodeado
  else if (window.location.hostname === 'drogueria-asielsa.vercel.app') {
    API_BASE_URL = 'https://dasa-api-xrec.onrender.com'; // ✅ URL hardcodeada para PRODUCCIÓN
  }
  // 4. Por defecto, para desarrollo local
  else {
    API_BASE_URL = 'http://localhost:3000';
  }
console.log("✅ Valor de API_BASE_URL:", API_BASE_URL);
console.log("✅ Variables de entorno (process.env):", process.env);
  const apiBaseUrl = `${API_BASE_URL}/usuarios`; // Construye la URL final
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

export default CuentaUsuaraio;