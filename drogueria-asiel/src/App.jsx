import { useState } from 'react'
import './App.css'
import Home from './pages/home/home'
import { SpeedInsights } from "@vercel/speed-insights/next"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SpeedInsights />
      <Home />
    </>
  )
}

export default App
