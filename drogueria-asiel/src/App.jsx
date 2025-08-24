import { lazy, Suspense, useEffect, useState } from 'react';
import Loader from './components/loader/loader';
import AuthCheck from './components/authCheck/authCheck';
import FeedbackBubble from './components/feedbackBubble/feedbackBubble';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const Home = lazy(() => import('./pages/home/home'));
const Usuarios = lazy(() => import('./pages/Users/cuentaUsuario'));
const VerificarCuenta = lazy(() => import('./pages/verificarCuenta/verificarCuenta'));
const Error404 = lazy(() => import('./pages/notFound/notFound'));
const Desarrollo = lazy(() => import('./pages/enDesarrollo/enDesarrollo'));

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 200); //tiempo de carga del loader
    return () => clearTimeout(timer);
  }, []);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <AuthCheck>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuario" element={<Usuarios />} />
          <Route path="/verificar-cuenta" element={<VerificarCuenta />} />
          <Route path="/en-desarrollo" element={<Desarrollo />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
        <FeedbackBubble />
      </AuthCheck>
    </Suspense>
  );
}

export default App;