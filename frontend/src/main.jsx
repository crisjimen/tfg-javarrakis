import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'

//Se envuelve toda la aplicacion en el AuthProvider
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> 
      <App />
    </AuthProvider>
  </StrictMode>
)
