import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './LoginModal.css';

function LoginModal({ isOpen, onClose }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        const result = login(username, password);
        if (result.success) {
            onClose();
            setUsername('');
            setPassword('');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="login-modal">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>Iniciar Sesión</h2>
                <p>Ingresa tus credenciales de administrador</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Usuario</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Ej: admin"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="login-btn-submit">Ingresar</button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
