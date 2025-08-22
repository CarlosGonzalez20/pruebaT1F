import { lazy, Suspense, useEffect, useState } from 'react';
import AuthCheck from './components/authCheck/authCheck';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Loader from './components/loader/loader';

const Home = lazy(() => import('./pages/home/home'));
const Testusuario = lazy(() => import('./pages/Users/cuentaUsuario'));
const Error404 = lazy(() => import('./pages/notFound/notFound'));

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
          <Route path="/test-usuarios" element={<Testusuario />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthCheck>
    </Suspense>
  );
}

export default App;