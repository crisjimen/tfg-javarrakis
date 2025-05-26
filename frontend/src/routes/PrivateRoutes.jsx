import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import LevelPage from '../pages/LevelPage'

/* Se definen las rutas privadas, las cuales solo son accesibles
    si el usuario está autenticado */

const PrivateRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/level" element={<LevelPage />}/>
        <Route path='*' element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default PrivateRoutes