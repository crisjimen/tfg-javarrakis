import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useAuth } from '../../../context/AuthContext';
import api from '@/services/api';
import '../../../pages/auth.css';

const Settings = () => {

    const navigate = useNavigate();
    const {logout} = useAuth();
    const [error, setError] = useState(null);
    const [exito, setExito] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    /* Cambiar contraseña */
    const changePassword = async (e) => {
        
        e.preventDefault();
        setError(null);
        setExito(null);
        try {
            setLoading(true);

            const response = await api.put('/auth/change-password', {
                currentPassword,
                newPassword
            });
            
            if(response.status === 200) {
               setExito('Contraseña cambiada correctamente');
                setCurrentPassword('');
                setNewPassword(''); 
            }

            else {
                setError(response.data.message || response.message || 'Error inesperado');
            }
            
        } catch (error) {
            setError(error.response.data.message || error.message || 'Error inesperado');   
        }
        finally {
            setLoading(false);
        }
    }

    /* Hacer logout y limpiar el token y el usuario del localStorage*/
    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
        window.location.reload();
    }


  return (
    <div className='flex flex-col gap-4'>
        <h2 className='pixel-text text-spice-900'>
            Ajustes
        </h2>

        {/* Cambiar contraseña */}
        <div>
            <p className='text-spice-900 font-bold'>
                Cambiar contraseña</p>
            <div
            className="flex items-center gap-1 text-xs text-spice-900">
                <Icon icon="pixel:exclamation-triangle-solid" 
                className="text-xs" />
                <p>La contraseña solo se podrá cambiar una vez cada 30 días.</p>
            </div>

            <form onSubmit={changePassword}
            className='flex flex-col gap-2 mt-4'>

                <div className="flex gap-2">
                    <input type="password" name="currentPassword" id="current"
                    placeholder='Contraseña actual' 
                    className='bg-sand-200 pixel-border text-xs py-2 px-1'
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    value={currentPassword}/>

                    <input type="password" name="newPassword" id="new" 
                    placeholder='Contraseña nueva' 
                    className='bg-sand-200 pixel-border text-xs py-2 px-1'
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}/>
                </div>

                {error && <p className='text-xs font-bold max-w-[350px] text-red-500'>{error}</p>}
                {exito && <p className='text-xs font-bold text-green-600'>{exito}</p>}

                
                <Button type="submit"
                className="md:w-2/4 bg-spice-500 text-sand-100
                pixel-text md:text-xs text-[12px] cursor-pointer mt-2
                hover:scale-105 hover:shadow-sm">

                    {loading ? 
                    <svg className="spinner" viewBox='0 0 50 50'>
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                    </svg> :
                    'Cambiar contraseña'}
                
                </Button>

            </form>

        </div>

        {/*Cerrar sesión*/}
        <div className='flex flex-col mt-4'>
            <p className='text-spice-900
            font-bold'>Cerrar sesión</p>

            <p className='text-sm text-sand-200'
            >Se cerrará la sesión en este dispositivo</p>

            <Button onClick={handleLogout}
                className="flex items-center gap-2 cursor-pointer
                sm:w-1/4 border-sand-200 border-2 bg-sand-200/70
                hover:bg-spice-900 hover:text-sand-200 mt-4
                hover:border-spice-900 scale-105 transition-all">
                <Icon icon="pixel:logout-solid" className="text-2xl" />
                Cerrar sesión
            </Button>
        </div>
        
    </div>
  )
}

export default Settings