// Contexto global para manejar la autenticación de los usuarios
import React, { createContext, useState, useEffect, useContext} from 'react';
import api from '../services/api'; // Importar la instancia de axios

//Creación del contexto
export const AuthContext = createContext();

//Componente proveedor del contexto
//Se define la información a la que se puede acceder desde cualquier componente
// que lo necesite
export const AuthProvider = ({ children }) => {

    //Estados del token y el usuario (si se encuentra logueado o no )
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(() => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    });

    //Actualizar el token cada vez que cambie
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);

    //Actualizar el usuario cada vez que cambie
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);


    //Función de iniciar sesión
    const login = async (email, password) => {
        
        try {
            const res = await api.post("/auth/login", {email, password});
            const data = res.data;
            setToken(data.token);
            setUser(data.user);
            return data;
            
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //Función para el registro
    const register = async (username, email, password) => {
        
        try {
            const res = await api.post("/auth/register", {username, email, password});
            const data = res.data;
            setToken(data.token);
            setUser(data.user);
            return data;

        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    //Logout
    const logout = () => {
        setToken(null);
        setUser(null);  
    }

    //Actualizar el usuario
    const refreshUser = async () => {
        try {
            const res = await api.get("/me");
            const data = res.data;
            setUser(data);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{token, user, login, logout, register, setUser, refreshUser}}>
            {children}
        </AuthContext.Provider>
    );
};

// exportar el hook para usar el contexto
export const useAuth = () => useContext(AuthContext);