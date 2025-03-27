import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import Error404 from './pages/notFound/notFound'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
