import { Route, Routes, Navigate } from 'react-router-dom'
import LoginRegisterPage from '../pages/LoginRegisterPage';
import HomePage from '../pages/HomePage';

/* Se definen las rutas públicas, las cuales son accesibles
   sin necesidad de estar autenticado */

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="auth" element={<LoginRegisterPage />} />
        <Route path='*' element={<Navigate to="/auth" replace />} />
    </Routes>
  )
}

export default PublicRoutes