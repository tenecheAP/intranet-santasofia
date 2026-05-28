import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type, id, removeNotification, duration }) => {
    useEffect(() => {
        if (duration === 0) return; // Si la duración es 0, el aviso es manual

        const timer = setTimeout(() => {
            removeNotification(id);
        }, duration);
        return () => clearTimeout(timer);
    }, [id, removeNotification, duration]);

    const getIcon = () => {
        switch (type) {
            case 'success': return <i className="fas fa-check-circle"></i>;
            case 'warning': return <i className="fas fa-exclamation-triangle"></i>;
            case 'error': return <i className="fas fa-exclamation-circle"></i>;
            default: return <i className="fas fa-info-circle"></i>;
        }
    };

    return (
        <div className={`toast-message ${type}`}>
            <div className="toast-icon">{getIcon()}</div>
            <div className="toast-content"><p>{message}</p></div>
            <button className="toast-close" onClick={(e) => {
                e.stopPropagation();
                removeNotification(id);
            }} style={{ position: 'relative', zIndex: 10 }}>
                <i className="fas fa-times"></i>
            </button>
            {duration > 0 && (
                <div className="toast-progress-bar" style={{ animationDuration: `${duration}ms` }}></div>
            )}
        </div>
    );
};

export default Toast;
