import React, { useState, useEffect } from 'react';
import sistemasService from '../services/api/sistemas.service';
import { useAuth } from '../context/AuthContext';
import './SliderAdmin.css'; // Reusing common admin styles

const SistemasAdmin = () => {
    const { user } = useAuth();
    const [sistemas, setSistemas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        url: '',
        interno: false,
        orden: 0,
        activo: true
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchSistemas();
    }, []);

    const fetchSistemas = async () => {
        try {
            const data = await sistemasService.getSistemas();
            setSistemas(data);
        } catch (error) {
            console.error('Error fetching sistemas:', error);
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
        try {
            if (editingId) {
                await sistemasService.updateSistema(editingId, formData);
                alert('Sistema actualizado correctamente');
            } else {
                await sistemasService.createSistema(formData);
                alert('Sistema creado correctamente');
            }
            handleCancel();
            fetchSistemas();
        } catch (error) {
            console.error('Error saving sistema:', error);
            alert('Error al guardar el sistema');
        }
    };

    const handleEdit = (item) => {
        setFormData({
            nombre: item.nombre,
            descripcion: item.descripcion || '',
            url: item.url,
            interno: item.interno,
            orden: item.orden,
            activo: item.activo
        });
        setEditingId(item.id);
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este sistema?')) {
            try {
                await sistemasService.deleteSistema(id);
                fetchSistemas();
            } catch (error) {
                console.error('Error deleting sistema:', error);
            }
        }
    };

    const handleCancel = () => {
        setFormData({
            nombre: '',
            descripcion: '',
            url: '',
            interno: false,
            orden: 0,
            activo: true
        });
        setEditingId(null);
    };

    if (!user || user.role !== 'admin') {
        return <div className="access-denied">Acceso Denegado</div>;
    }

    return (
        <div className="slider-admin sistemas-admin-container">
            <h1>Gestión de Aplicativos y Software</h1>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? 'Editar Aplicativo' : 'Nuevo Aplicativo'}</h2>

                <div className="form-group">
                    <label>Nombre del Aplicativo:</label>
                    <input
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        placeholder="Ej: Hosvital, Softhia Lab..."
                    />
                </div>

                <div className="form-group">
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        rows="3"
                        placeholder="Breve descripción de la funcionalidad..."
                    />
                </div>

                <div className="form-group">
                    <label>URL / Enlace:</label>
                    <input
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        required
                        placeholder="http://... o /ruta-interna"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="interno"
                                checked={formData.interno}
                                onChange={handleInputChange}
                            />
                            ¿Es enlace interno? (React Router)
                        </label>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Orden de visualización:</label>
                        <input
                            type="number"
                            name="orden"
                            value={formData.orden}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="activo"
                                checked={formData.activo}
                                onChange={handleInputChange}
                            />
                            Activo
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">
                        {editingId ? 'Actualizar' : 'Crear'}
                    </button>
                    {editingId && (
                        <button type="button" className="btn-cancel" onClick={handleCancel}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="slides-list">
                <h2>Aplicativos Existentes</h2>
                {loading ? (
                    <p>Cargando aplicativos...</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Orden</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sistemas.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.orden}</td>
                                    <td>
                                        <span className={`status-badge ${item.activo ? 'active' : 'inactive'}`}>
                                            {item.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(item)} className="btn-edit">Editar</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn-delete">Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default SistemasAdmin;
