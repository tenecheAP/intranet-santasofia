import React, { useState, useEffect, useRef } from 'react';
import notificationsService from '../services/api/notifications.service';
import { useAuth } from '../context/AuthContext';
import { 
    Bell, 
    Plus, 
    Edit, 
    Trash2, 
    Clock, 
    CheckCircle2, 
    AlertTriangle, 
    AlertCircle, 
    Info, 
    ToggleLeft, 
    ToggleRight, 
    Calendar,
    Timer,
    Sparkles
} from 'lucide-react';
import './NotificationsAdmin.css';

// Convierte fecha ISO o Date a formato YYYY-MM-DDTHH:mm para el input datetime-local
const toInputDateTime = (dateValue) => {
    if (!dateValue) return '';
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return '';
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

// Formato amigable en español
const formatDisplayDate = (dateValue) => {
    if (!dateValue) return '';
    const d = new Date(dateValue);
    if (isNaN(d.getTime())) return String(dateValue);
    return d.toLocaleString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Calcula el estado en tiempo real (Vigente, Programada, Vencida, Inactiva)
const getNotificationStatus = (notif) => {
    if (!notif.activa) {
        return { label: 'Inactiva', className: 'status-inactiva' };
    }
    const now = new Date();
    const inicio = new Date(notif.fecha_inicio);
    const fin = new Date(notif.fecha_fin);

    if (now < inicio) {
        return { label: 'Programada (Futura)', className: 'status-programada' };
    }
    if (now > fin) {
        return { label: 'Vencida', className: 'status-vencida' };
    }
    return { label: 'Vigente en Intranet', className: 'status-vigente' };
};

const getTipoIcon = (tipo) => {
    switch (tipo) {
        case 'success': return <CheckCircle2 size={18} color="#15803d" />;
        case 'warning': return <AlertTriangle size={18} color="#b45309" />;
        case 'error': return <AlertCircle size={18} color="#b91c1c" />;
        default: return <Info size={18} color="#0369a1" />;
    }
};

const NotificationsAdmin = () => {
    const { user } = useAuth();
    const formRef = useRef(null);

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Fechas por defecto: inicio hoy, fin en 30 días
    const getDefaultForm = () => {
        const now = new Date();
        const nextMonth = new Date();
        nextMonth.setDate(now.getDate() + 30);

        return {
            titulo: '',
            mensaje: '',
            tipo: 'info',
            activa: true,
            duracion: 5000,
            fecha_inicio: toInputDateTime(now),
            fecha_fin: toInputDateTime(nextMonth)
        };
    };

    const [formData, setFormData] = useState(getDefaultForm());

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setLoading(true);
        try {
            const data = await notificationsService.getNotifications();
            setNotifications(data || []);
        } catch (error) {
            console.error('Error cargando notificaciones:', error);
            alert('No se pudieron cargar las notificaciones desde el servidor.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.mensaje.trim()) {
            alert('Por favor escribe el mensaje de la notificación.');
            return;
        }

        if (new Date(formData.fecha_fin) <= new Date(formData.fecha_inicio)) {
            alert('La fecha de fin debe ser posterior a la fecha de inicio.');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                ...formData,
                duracion: parseInt(formData.duracion, 10)
            };

            if (editingId) {
                await notificationsService.updateNotification(editingId, payload);
                alert('¡Notificación actualizada con éxito!');
            } else {
                await notificationsService.createNotification(payload);
                alert('¡Notificación creada con éxito!');
            }

            handleCancel();
            await fetchNotifications();
        } catch (error) {
            console.error('Error al guardar notificación:', error);
            alert('Ocurrió un error al guardar la notificación. Verifica la conexión con el servidor.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (notif) => {
        setFormData({
            titulo: notif.titulo || '',
            mensaje: notif.mensaje || '',
            tipo: notif.tipo || 'info',
            activa: notif.activa !== undefined ? notif.activa : true,
            duracion: notif.duracion !== undefined ? notif.duracion : 5000,
            fecha_inicio: toInputDateTime(notif.fecha_inicio),
            fecha_fin: toInputDateTime(notif.fecha_fin)
        });
        setEditingId(notif.id);

        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleToggle = async (id) => {
        try {
            await notificationsService.toggleNotification(id);
            await fetchNotifications();
        } catch (error) {
            console.error('Error al alternar estado:', error);
            alert('Error al cambiar el estado de la notificación');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar permanentemente esta notificación?')) {
            try {
                await notificationsService.deleteNotification(id);
                if (editingId === id) {
                    handleCancel();
                }
                await fetchNotifications();
            } catch (error) {
                console.error('Error al eliminar notificación:', error);
                alert('Error al eliminar la notificación.');
            }
        }
    };

    const handleCancel = () => {
        setFormData(getDefaultForm());
        setEditingId(null);
    };

    if (!user || user.role !== 'admin') {
        return (
            <div className="notif-admin-container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <AlertCircle size={48} color="#dc3545" style={{ marginBottom: '1rem' }} />
                <h2>Acceso Restringido</h2>
                <p>Debes iniciar sesión con una cuenta de Administrador para gestionar las notificaciones de la Intranet.</p>
            </div>
        );
    }

    return (
        <div className="notif-admin-container">
            <div className="notif-header">
                <div style={{ background: '#e0f2fe', padding: '12px', borderRadius: '12px' }}>
                    <Bell size={32} color="#0056b3" />
                </div>
                <div>
                    <h1>Gestión de Notificaciones (Toasts)</h1>
                    <p>Administra los avisos y alertas institucionales que se despliegan en el portal principal.</p>
                </div>
            </div>

            {/* Formulario de Creación / Edición */}
            <div className="notif-form-card" ref={formRef}>
                <div className="notif-form-title">
                    {editingId ? <Edit size={22} color="#0056b3" /> : <Plus size={22} color="#0056b3" />}
                    <strong>{editingId ? 'Editar Notificación' : 'Crear Nueva Notificación'}</strong>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="notif-grid-2">
                        <div className="notif-form-group">
                            <label>Título / Identificador Interno:</label>
                            <input
                                type="text"
                                name="titulo"
                                value={formData.titulo}
                                onChange={handleInputChange}
                                placeholder="Ej: Mantenimiento Sistemas, Bienvenida..."
                            />
                        </div>

                        <div className="notif-form-group">
                            <label>Tipo de Notificación:</label>
                            <select
                                name="tipo"
                                value={formData.tipo}
                                onChange={handleInputChange}
                            >
                                <option value="info">Información (Azul)</option>
                                <option value="success">Éxito / Positivo (Verde)</option>
                                <option value="warning">Advertencia / Precaución (Amarillo)</option>
                                <option value="error">Urgente / Alerta (Rojo)</option>
                            </select>
                        </div>
                    </div>

                    <div className="notif-form-group">
                        <label>Mensaje del Toast (Visible para los colaboradores): *</label>
                        <textarea
                            name="mensaje"
                            value={formData.mensaje}
                            onChange={handleInputChange}
                            rows={3}
                            placeholder="Escribe el mensaje claro y conciso que verán los usuarios..."
                            required
                        />
                    </div>

                    {/* Vista previa en tiempo real */}
                    <div className={`notif-preview-box preview-${formData.tipo}`}>
                        {getTipoIcon(formData.tipo)}
                        <div>
                            <strong>Vista previa: </strong>
                            {formData.mensaje.trim() ? formData.mensaje : 'El texto de la notificación aparecerá aquí.'}
                        </div>
                    </div>

                    <div className="notif-grid-2">
                        <div className="notif-form-group">
                            <label><Calendar size={16} /> Fecha y Hora de Inicio: *</label>
                            <input
                                type="datetime-local"
                                name="fecha_inicio"
                                value={formData.fecha_inicio}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="notif-form-group">
                            <label><Calendar size={16} /> Fecha y Hora de Fin: *</label>
                            <input
                                type="datetime-local"
                                name="fecha_fin"
                                value={formData.fecha_fin}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="notif-grid-2">
                        <div className="notif-form-group">
                            <label><Timer size={16} /> Tiempo en Pantalla:</label>
                            <select
                                name="duracion"
                                value={formData.duracion}
                                onChange={handleInputChange}
                            >
                                <option value="5000">5 segundos (Recomendado estándar)</option>
                                <option value="8000">8 segundos (Mensajes medianos)</option>
                                <option value="12000">12 segundos (Mensajes largos)</option>
                                <option value="0">Permanente (Hasta que el usuario dé clic en cerrar)</option>
                            </select>
                        </div>

                        <div className="notif-form-group" style={{ justifyContent: 'center' }}>
                            <label style={{ cursor: 'pointer', marginTop: '1.2rem' }}>
                                <input
                                    type="checkbox"
                                    name="activa"
                                    checked={formData.activa}
                                    onChange={handleInputChange}
                                    style={{ marginRight: '8px', width: '18px', height: '18px' }}
                                />
                                <strong>Habilitar notificación inmediatamente</strong>
                            </label>
                        </div>
                    </div>

                    <div className="notif-actions-row">
                        <button 
                            type="submit" 
                            className="btn-notif-primary" 
                            disabled={submitting}
                        >
                            <Sparkles size={18} />
                            {submitting 
                                ? 'Guardando...' 
                                : (editingId ? 'Actualizar Notificación' : 'Guardar y Publicar')}
                        </button>

                        {editingId && (
                            <button 
                                type="button" 
                                className="btn-notif-secondary"
                                onClick={handleCancel}
                            >
                                Cancelar Edición
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Listado de Notificaciones Registradas */}
            <div className="notif-list-header">
                <h2>Avisos Registrados en Base de Datos ({notifications.length})</h2>
                <button 
                    onClick={fetchNotifications} 
                    className="btn-action btn-action-toggle"
                >
                    Recargar lista
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                    <p>Cargando notificaciones desde la base de datos...</p>
                </div>
            ) : notifications.length === 0 ? (
                <div className="notif-empty">
                    <Bell size={40} color="#94a3b8" style={{ marginBottom: '10px' }} />
                    <h3>No hay notificaciones registradas</h3>
                    <p>Crea tu primer aviso utilizando el formulario de arriba.</p>
                </div>
            ) : (
                <div className="notif-list">
                    {notifications.map((notif) => {
                        const status = getNotificationStatus(notif);
                        return (
                            <div 
                                key={notif.id} 
                                className={`notif-card ${!notif.activa ? 'inactiva' : ''}`}
                            >
                                <div className="notif-card-top">
                                    <div className="notif-card-title-group">
                                        <span className={`notif-badge badge-${notif.tipo}`}>
                                            {notif.tipo}
                                        </span>
                                        <span className="notif-card-title">
                                            {notif.titulo || 'Aviso Institucional'}
                                        </span>
                                        <span className={`status-badge ${status.className}`}>
                                            {status.label}
                                        </span>
                                    </div>

                                    <div className="notif-card-actions">
                                        <button
                                            className="btn-action btn-action-toggle"
                                            onClick={() => handleToggle(notif.id)}
                                            title={notif.activa ? 'Pausar/Desactivar' : 'Activar'}
                                        >
                                            {notif.activa ? (
                                                <>
                                                    <ToggleRight size={18} color="#166534" />
                                                    Pausar
                                                </>
                                            ) : (
                                                <>
                                                    <ToggleLeft size={18} color="#64748b" />
                                                    Activar
                                                </>
                                            )}
                                        </button>

                                        <button
                                            className="btn-action btn-action-edit"
                                            onClick={() => handleEdit(notif)}
                                            title="Editar aviso"
                                        >
                                            <Edit size={16} />
                                            Editar
                                        </button>

                                        <button
                                            className="btn-action btn-action-delete"
                                            onClick={() => handleDelete(notif.id)}
                                            title="Eliminar aviso"
                                        >
                                            <Trash2 size={16} />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>

                                <div className="notif-card-message">
                                    {notif.mensaje}
                                </div>

                                <div className="notif-card-footer">
                                    <div className="notif-meta-items">
                                        <div className="notif-meta-item">
                                            <Clock size={15} />
                                            <strong>Inicio:</strong> {formatDisplayDate(notif.fecha_inicio)}
                                        </div>
                                        <div className="notif-meta-item">
                                            <Clock size={15} />
                                            <strong>Fin:</strong> {formatDisplayDate(notif.fecha_fin)}
                                        </div>
                                        <div className="notif-meta-item">
                                            <Timer size={15} />
                                            <strong>Duración:</strong> {notif.duracion === 0 ? 'Permanente' : `${notif.duracion / 1000} seg`}
                                        </div>
                                    </div>

                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                        ID: #{notif.id}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default NotificationsAdmin;
