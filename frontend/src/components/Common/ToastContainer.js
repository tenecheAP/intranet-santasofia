import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import Toast from './Toast';
import './Toast.css';

const ToastContainer = () => {
    const { notifications, removeNotification } = useNotification();

    return (
        <div className="toast-container">
            {notifications.map((notification) => (
                <Toast
                    key={notification.id}
                    {...notification}
                    removeNotification={removeNotification}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
