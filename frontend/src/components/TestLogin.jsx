// src/components/TestLogin.jsx
import React, { useState } from 'react';
import api from '../services/api';

const TestLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setResult(`Login exitoso. Token guardado.`);
    } catch (err) {
      setResult(`Error al iniciar sesión: ${err.response?.data?.message || err.message}`);
    }
  };

  const testAuth = async () => {
    try {
      const res = await api.get('/levels'); // requiere Authorization: Bearer <token>
      setResult(`Usuario autenticado: ${JSON.stringify(res.data)}`);
    } catch (err) {
      setResult(`Token inválido o expirado: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h2>Probar Login y Auth</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Iniciar sesión</button>
      <button onClick={testAuth}>Probar token con /auth/me</button>
      {result && <p>{result}</p>}
    </div>
  );
};

export default TestLogin;
