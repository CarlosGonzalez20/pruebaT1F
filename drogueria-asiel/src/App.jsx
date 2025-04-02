import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Loader from './components/loader/loader';

const Home = lazy(() => import('./pages/home/home'));
const Error404 = lazy(() => import('./pages/notFound/notFound'));

function App() {
  return (
    <div className="app-container">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;