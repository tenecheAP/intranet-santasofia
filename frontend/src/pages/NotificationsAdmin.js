import React from 'react';
import { notificationsData } from '../data/notificationsData';
import { Bell, Info, Clock, Edit } from 'lucide-react';

const NotificationsAdmin = () => {
    return (
        <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <Bell size={32} color="#0056b3" />
                <h1>Gestión de Notificaciones (Toasts)</h1>
            </div>

            <div style={{ 
                background: '#e7f3ff', 
                padding: '1.5rem', 
                borderRadius: '12px', 
                borderLeft: '5px solid #0056b3',
                marginBottom: '2rem' 
            }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <Info size={20} /> Instrucciones de Edición
                </h3>
                <p>Para crear, editar o eliminar notificaciones, debes modificar el siguiente archivo en el servidor:</p>
                <code style={{ 
                    display: 'block', 
                    background: '#f8f9fa', 
                    padding: '10px', 
                    borderRadius: '6px',
                    marginTop: '10px',
                    fontWeight: 'bold',
                    color: '#e83e8c'
                }}>
                    frontend/src/data/notificationsData.js
                </code>
            </div>

            <div className="section-divider">
                <h2>Avisos Actuales en el Sistema</h2>
                <hr />
            </div>

            <div style={{ display: 'grid', gap: '15px' }}>
                {notificationsData.map((notif) => (
                    <div key={notif.id} style={{ 
                        background: 'white', 
                        padding: '1.5rem', 
                        borderRadius: '12px', 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        border: '1px solid #eee'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <strong style={{ fontSize: '1.1rem' }}>{notif.mensaje}</strong>
                            <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '20px', 
                                fontSize: '0.8rem',
                                background: notif.activa ? '#d4edda' : '#f8d7da',
                                color: notif.activa ? '#155724' : '#721c24'
                            }}>
                                {notif.activa ? 'Activa' : 'Inactiva'}
                            </span>
                        </div>
                        <div style={{ marginTop: '15px', display: 'flex', gap: '20px', color: '#666', fontSize: '0.9rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Clock size={16} /> <strong>Inicio:</strong> {notif.fecha_inicio}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Clock size={16} /> <strong>Fin:</strong> {notif.fecha_fin}
                            </span>
                            <span style={{ marginLeft: 'auto', color: '#0056b3' }}>
                                Tipo: {notif.tipo.toUpperCase()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NotificationsAdmin;
