import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// Fuentes empaquetadas con la app: funcionan sin conexión
import '@fontsource-variable/outfit'
import '@fontsource-variable/jetbrains-mono'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
