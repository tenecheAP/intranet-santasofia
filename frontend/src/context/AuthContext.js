import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        // Hardcoded credentials for simulation as requested
        if (username === 'admin' && password === 'Isabella') {
            const userData = { username: 'Administrador', role: 'admin' };
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            return { success: true };
        } else {
            return { success: false, message: 'Usuario o contraseña incorrectos' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
