// Se añade la lógica de la conexión con el backend
// Se hace uso de la librería de axios para hacer las peticiones a la APIA
import axios from 'axios';

export const API_URL = 'http://localhost:8080/api'; // URL base de la API

//Contexto global de axios
// Instancia global para todas las peticiones a la API


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    },
});

// Interceptor para añadir el token, si lo detecta, antes de cada request
api.interceptors.request.use((config) => {
    // Se configura el token si lo detecta en el localStorage
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
} , (error) => {
    return Promise.reject(error);
});

export default api;
