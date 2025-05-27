import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Icon } from '@iconify/react';
import api from '../../services/api';

const LoginForm = () => {
  
  /* OnChange handles para cambiar el valor y estado de los inputs*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /*Manejar el formulario*/
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(error) return;

    try {
      setLoading(true);

      const response = await api.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/', { replace: true });
      
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message || error.message || 'Error inesperado');
    }
  }

  return (
    <div className='flex shadow-sm
    mt-5 flex-col p-4 py-8 pixel-border rounded-pixel border-3 
    border-dusk-100 justify-center mb-1
    backdrop-blur-sm bg-dusk-300/45 gap-1'>
      
      <div className="flex flex-col text-center">
        <h1 
        className='text-2xl font-bold pixel-text text-dusk-900 mt-2'>
          INICIAR SESIÓN
        </h1>

        <p className='text-indigo-100 whitespace-pre-line mt-2 text-s
        leading-tight'>
          {"Regresa a Javarrakis y continúa tu viaje. \nTu destino te espera."}
        </p>
      </div>
    
      <form onSubmit={handleSubmit}
      className='flex flex-col font-montserrat mt-4 mb-3 mx-5
       gap-4'>
        
        {/* Email */}
        <div className="relative">

          <span className="span absolute inset-y-0 left-0 top-1
          flex items-center pl-3 text-dusk-800">
            <Icon icon="pixel:envelope-solid" className='size-4.5' />
          </span>

          <input type="email" 
          id="email"
          name="email" 
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='bg-indigo-50 py-1.5 px-2 pixel-border focus:outline-0 mt-1
          text-sm pl-10 w-full'
          required/>
        </div>

        {/* Password */}
        <div className="flex flex-row gap-4">
          <div className="relative">

            <span className="span absolute inset-y-0 left-0
            flex items-center pl-3 text-dusk-800">
              <Icon icon="pixel:unlock-alt-solid" className='size-4.5' />
            </span>

            <input type={showPassword ? "text" : "password"} 
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-indigo-50 py-1.5 px-2 pixel-border focus:outline-0 mt-1
            text-sm w-100 pl-10 pr-10'
            placeholder='Contraseña'
            required/>

            <span className="span absolute inset-y-0 right-0 top-1
            flex items-center pr-2 text-dusk-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}>
              <Icon 
              icon={showPassword ? "pixel:eye" : "pixel:eye-cross"} 
              className='size-5.5' />
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1">
            <a href="/forgot-password" 
            className='hover:underline font-semibold text-xs text-dusk-900 '>
              ¿Olvidaste tu contraseña?
            </a>
        </div>
        
        {/* Mensaje de error*/}
        {error && (
          <p className='text-xs text-indigo-800 mt-1 font-bold flex items-center'>
            <Icon icon="pixel:exclamation-triangle-solid" 
            className='inline size-4 mr-1' />
            {error}
          </p>
        )}

        <Button type='submit'
        className='mt-2 bg-dusk-500 hover:bg-dusk-600 text-white 
        py-5 rounded-pixel pixel-text cursor-pointer'>

          {loading ? (
            <svg className="spinner" viewBox='0 0 50 50'>
              <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
            </svg>
          ) : 
          ('ENTRAR')

          }
        </Button>
      </form>

      <div className="flex align-middle items-center justify-center mb-3 gap-2">
        <div className="h-0.5 bg-dusk-100 w-1/3"></div>
        <p className='text-xs text-dusk-800'>
        O inicia sesión con
        </p>
        <div className="h-0.5 bg-dusk-100 w-1/3"></div>
      </div>
      
      <div className='flex gap-4 self-center'>
        <Button className='mt-2 border-1 hover:border-dusk-800 border-indigo-100
        cursor-pointer bg-indigo-100 text-dusk-800 hover:bg-transparent
        hover:text-indigo-100'>
          <Icon icon="pixel:google" className='inline size-6' /> 
          Google
        </Button>

        <Button className='mt-2 border-1 hover:border-dusk-800 border-indigo-100
        cursor-pointer bg-indigo-100 text-dusk-800 hover:bg-transparent
        hover:text-indigo-100'>
          <Icon icon="pixel:github" className='inline size-6' /> 
          Github
        </Button>
      </div>

      <div className='mt-3 text-center leading-tight text-white
      text-xs'>
        ¿Aún no tienes una cuenta?
        <p className='text-dusk-800 hover:underline font-bold ml-0.5
        cursor-pointer'
        onClick={() => navigate('/auth?view=register')}>  
          Regístrate aquí
        </p>
        </div>

    </div>
  )
}


export default LoginForm