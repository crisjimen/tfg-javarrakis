import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import  api from '../../services/api';

const RegisterForm = () => {

  /* OnChange handles para cambiar el valor y estado de los inputs*/
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  /* Comprobacion de errores y de carga */
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //Llamada a la API para registrar el usuario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(error) return;

    try {
      setLoading(true);

      const response = await api.post('/auth/register', {
        username,
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      {/* Redireccionar a la pagina principal */}
      navigate('/', { replace: true });
      
    } catch (error) {
      setError(error.response.data.message || error.message || 'Error inesperado');
    } 
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    //Validar que el username no tenga espacios
    if (username.includes(' ')) {
      setError('El nombre de usuario no puede contener espacios.');
    }

    else if (confirmPassword && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
    }

    else {
      setError(null);
    }
  }, [username, password, confirmPassword]);

  return (
    <div className='flex shadow-sm
    mt-5 flex-col p-4 pixel-border rounded-pixel border-3 
    border-spice-100 justify-center
    backdrop-blur-sm bg-spice-300/45'>
      
      <div className="flex flex-col text-center">
        <h1 
        className='text-2xl font-bold pixel-text text-spice-900 mt-2'>
          REGISTRO
        </h1>

        <p className='text-amber-100 whitespace-pre-line mt-2 text-s
        leading-tight'>
          {"Adéntrate en el mundo de Javarrakis \ny emprende tu camino hacia la especia del código"}
        </p>
      </div>
    
      <form onSubmit={handleSubmit}
      className='flex flex-col font-montserrat mt-4 mb-3 mx-5
       gap-4'>

        {/* Username*/}
        <div className="relative">

          <span className="span absolute inset-y-0 left-0 
          flex items-center pl-3 text-spice-800">
            <Icon icon="pixel:user-solid" className='size-4.5' />
          </span>

          <input type="text" 
          id="username"
          name="username"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          className='bg-amber-50 py-1.5 px-2 pixel-border focus:outline-0 mt-1
          text-sm pl-10 w-full'
          required/>
        </div>
        
        {/* Email */}
        <div className="relative">

          <span className="span absolute inset-y-0 left-0 top-1
          flex items-center pl-3 text-spice-800">
            <Icon icon="pixel:envelope-solid" className='size-4.5' />
          </span>

          <input type="email" 
          id="email"
          name="email" 
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-amber-50 py-1.5 px-2 pixel-border focus:outline-0 mt-1
          text-sm pl-10 w-full'
          required/>
        </div>

        {/* Password */}
        <div className="flex flex-row gap-4">
          <div className="relative">

            <span className="span absolute inset-y-0 left-0
          flex items-center pl-3 text-spice-800">
            <Icon icon="pixel:unlock-alt-solid" className='size-4.5' />
          </span>

            <input type={showPassword ? "text" : "password"} 
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-amber-50 py-1.5 px-2 pixel-border focus:outline-0 mt-1
            text-sm w-full pl-10'
            placeholder='Contraseña'
            required/>

            <span className="span absolute inset-y-0 right-0 top-1
            flex items-center pr-2 text-spice-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}>
            <Icon 
            icon={showPassword ? "pixel:eye" : "pixel:eye-cross"} 
            className='size-5.5' />
          </span>
          </div>
        
          <div className="flex flex-col">

            <input type="password" 
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Confirmar contraseña'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='bg-amber-50 py-1.5 px-2 pixel-border focus:outline-0 mt-1
            text-sm'/>
          </div>
        </div>


        {/* Mensaje de error */}
        {error && (
        <p className='text-xs text-red-800 mt-1 font-bold flex items-center'>
          <Icon icon="pixel:exclamation-triangle-solid" 
          className='inline size-4 mr-1' />
          {error}
        </p>
      )}

        <div className="flex flex-row items-center gap-1">
          <input type="checkbox" name="terms" 
          id="terms" required
          className='h-4 w-4 accent-spice-800 cursor-pointer'/>


          <label htmlFor="terms" 
          className='text-xs text-spice-900 ml-1'>
            Acepto los <a href="/terms" 
            className='hover:underline font-bold'>
              Términos y Condiciones
            </a>
          </label>
        </div>
        
        {/* Botón de registro */}
        <Button type='submit'
        className='mt-2 bg-spice-500 hover:bg-spice-600 text-white 
        py-5 rounded-pixel pixel-text cursor-pointer'>
          
          {loading ? (
            <svg className="spinner" viewBox='0 0 50 50'>
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
          ) : 

          ('CREAR CUENTA')
          }
        </Button>
      </form>

      <div className="flex align-middle items-center justify-center mb-3 gap-2">
        <div className="h-0.5 bg-spice-100 w-1/3"></div>
        <p className='text-xs text-spice-800'>
        O regístrate con
        </p>
        <div className="h-0.5 bg-spice-100 w-1/3"></div>
      </div>
      
    {/* Botones de registro con Google y Github */}
      <div className='flex gap-4 self-center'>
        <Button className='mt-2 border-1 hover:border-spice-800 border-sand-100
        cursor-pointer bg-sand-100 text-spice-800 hover:bg-transparent
        hover:text-sand-100'>
          <Icon icon="pixel:google" className='inline size-6' /> 
          Google
        </Button>

        <Button className='mt-2 border-1 hover:border-spice-800 border-sand-100
        cursor-pointer bg-sand-100 text-spice-800 hover:bg-transparent
        hover:text-sand-100'>
          <Icon icon="pixel:github" className='inline size-6' /> 
          Github
        </Button>
      </div>

      <div className='mt-3 text-center leading-tight text-white
      text-xs'>
        ¿Ya tienes una cuenta?
          <p className='text-spice-800 hover:underline font-bold 
          ml-0.5 cursor-pointer'
          onClick={() => navigate('/auth?view=login')}>  
            Inicia sesión aquí
          </p>
        </div>

    </div>
  )
}

export default RegisterForm