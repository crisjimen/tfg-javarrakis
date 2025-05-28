import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { useAuth } from '../../../context/AuthContext';

const Settings = () => {

    const navigate = useNavigate();
    const { setUser } = useAuth();
    const {error, setError} = useState(null);

    /* Hacer logout */
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/', { replace: true });
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

            <form onSubmit={(e) => e.preventDefault()}
            className='flex flex-col gap-2 mt-4'>

                <div className="flex gap-2">
                    <input type="password" name="currentPassword" id="current"
                    placeholder='Contraseña actual' 
                    className='bg-sand-200 pixel-border text-xs py-2 px-1'/>

                    <input type="password" name="newPassword" id="new" 
                    placeholder='Contraseña nueva' 
                    className='bg-sand-200 pixel-border text-xs py-2 px-1'/>
                </div>

                {error &&
                (<p className='text-xs text-red-500'>{error}</p>)}
                
                <Button
                className="w-2/4 bg-spice-400 text-sand-100
                pixel-text text-xs cursor-pointer mt-2
                hover:scale-105 hover:shadow-sm">
                    Cambiar contraseña
                </Button>

            </form>

        </div>

        {/*Cerrar sesión*/}
        <div className='flex flex-col mt-4'>
            <p className='text-spice-900
            font-bold'>Cerrar sesión</p>

            <p className='text-sm text-sand-200'
            >Se cerrará la sesión en este dispositivo</p>

            <Button onClick={logout}
                className="flex items-center gap-2 cursor-pointer
                w-1/4 border-sand-200 border-2 bg-sand-200/70
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