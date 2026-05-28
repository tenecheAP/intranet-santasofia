import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification debe usarse dentro de un NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const showNotification = useCallback((message, type = 'info', duration = 5000) => {
        const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        
        // Si es aviso o error, no auto-eliminar (duration 0)
        const finalDuration = (type === 'warning' || type === 'error') ? 0 : duration;

        setNotifications((prev) => [...prev, { id, message, type, duration: finalDuration }]);

        // Solo auto-eliminar si la duración es mayor a 0
        if (finalDuration > 0) {
            setTimeout(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }, finalDuration);
        }
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification, removeNotification, notifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
