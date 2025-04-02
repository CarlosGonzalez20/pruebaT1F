import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';

// Componentes cargados dinámicamente
const Home = lazy(() => import('./pages/home/home'));
const Error404 = lazy(() => import('./pages/notFound/notFound'));
const Loader = lazy(() => import('./components/loader/loader'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Suspense>
  );
}

export default App;