import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' //Se importa tailwind
import App from './components/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
