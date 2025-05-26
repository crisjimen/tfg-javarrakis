import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

/* Se definen las rutas de la aplicación, tanto públicas como privadas */
const AppRouter = () => {

    const [status, setStatus] = useState('checking');

    // Se valora si el usuario se encuentra autenticado o no
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setStatus('authenticated');
        }
        else {
            setStatus('not-authenticated');
        }
    }, []);

    if (status === 'checking') {
        return ( <h3>Loading...</h3> );
    }

  return (
    <BrowserRouter>
        <Routes>

            {
                status === "authenticated" ? 
                (<Route path='/*' element={<PrivateRoutes />} />) : 
                (<Route path='/*' element={<PublicRoutes />} />)
            }

        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter