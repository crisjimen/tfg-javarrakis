import { Route, Routes, Navigate } from 'react-router-dom'
import LoginRegisterPage from '../pages/LoginRegisterPage';
import HomePage from '../pages/HomePage';

/* Se definen las rutas públicas, las cuales son accesibles
   sin necesidad de estar autenticado */

const PublicRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginRegisterPage />} />
        <Route path="register" element={<LoginRegisterPage />} />
        <Route path='*' element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default PublicRoutes