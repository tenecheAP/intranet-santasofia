import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './SliderAdmin.css';

function SliderAdmin() {
    const { user } = useAuth();
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        titulo: '',
        link: '',
        es_interno: false,
        contenido: '',
        resumen: '',
        orden: 0,
        activo: true
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_URL || '';
            const url = `${baseUrl}/slider`;
            const response = await fetch(url);
            const data = await response.json();
            setSlides(data);
        } catch (error) {
            console.error('Error fetching slides:', error);
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

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });
        if (imageFile) {
            data.append('imagen', imageFile);
        }

        try {
            const baseUrl = process.env.REACT_APP_API_URL || '';
            const url = editingId ? `${baseUrl}/slider/${editingId}` : `${baseUrl}/slider`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                body: data
            });

            if (response.ok) {
                alert(editingId ? 'Anuncio actualizado' : 'Anuncio creado');
                setEditingId(null);
                setFormData({
                    titulo: '',
                    link: '',
                    es_interno: false,
                    contenido: '',
                    resumen: '',
                    orden: 0,
                    activo: true
                });
                setImageFile(null);
                fetchSlides();
            } else {
                const errorData = await response.json();
                alert(`Error al guardar: ${errorData.error || response.statusText}\n${errorData.details || ''}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión o del servidor');
        }
    };

    const handleEdit = (slide) => {
        setEditingId(slide.id);
        setFormData({
            titulo: slide.titulo,
            link: slide.link || '',
            es_interno: slide.es_interno,
            contenido: slide.contenido || '',
            resumen: slide.resumen || '',
            orden: slide.orden,
            activo: slide.activo
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este anuncio?')) return;
        try {
            const baseUrl = process.env.REACT_APP_API_URL || '';
            await fetch(`${baseUrl}/slider/${id}`, { method: 'DELETE' });
            fetchSlides();
        } catch (error) {
            console.error('Error deleting:', error);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({
            titulo: '',
            link: '',
            es_interno: false,
            contenido: '',
            resumen: '',
            orden: 0,
            activo: true
        });
        setImageFile(null);
    }

    if (!user || user.role !== 'admin') {
        return <div className="access-denied">Acceso Denegado</div>;
    }

    return (
        <div className="slider-admin">
            <h1>Administración de Slider</h1>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h2>

                <div className="form-group">
                    <label>Título:</label>
                    <input name="titulo" value={formData.titulo} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <label>Imagen (1920x600 recomendado):</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} required={!editingId} />
                </div>

                <div className="form-group">
                    <label>Resumen (visible en slider):</label>
                    <input name="resumen" value={formData.resumen} onChange={handleInputChange} />
                </div>

                <div className="form-group checkbox-group">
                    <label>
                        <input
                            type="checkbox"
                            name="es_interno"
                            checked={formData.es_interno}
                            onChange={handleInputChange}
                        />
                        ¿Es contenido interno?
                    </label>
                </div>

                {formData.es_interno ? (
                    <div className="form-group">
                        <label>Contenido (HTML permitido):</label>
                        <textarea
                            name="contenido"
                            value={formData.contenido}
                            onChange={handleInputChange}
                            rows="10"
                        />
                    </div>
                ) : (
                    <div className="form-group">
                        <label>Enlace Externo / Documento:</label>
                        <input name="link" value={formData.link} onChange={handleInputChange} placeholder="http://... o /documentos/..." />
                    </div>
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label>Orden:</label>
                        <input type="number" name="orden" value={formData.orden} onChange={handleInputChange} />
                    </div>
                    <div className="form-group checkbox-group">
                        <label>
                            <input type="checkbox" name="activo" checked={formData.activo} onChange={handleInputChange} />
                            Activo
                        </label>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">{editingId ? 'Actualizar' : 'Crear'}</button>
                    {editingId && <button type="button" className="btn-cancel" onClick={handleCancel}>Cancelar</button>}
                </div>
            </form>

            <div className="slides-list">
                <h2>Anuncios Existentes</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Img</th>
                            <th>Título</th>
                            <th>Orden</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slides.map(slide => (
                            <tr key={slide.id}>
                                <td>
                                    <img
                                        src={slide.imagen_url ? (slide.imagen_url.startsWith('http') ? slide.imagen_url : slide.imagen_url) : ''}
                                        alt="thumb"
                                        className="table-thumb"
                                    />
                                </td>
                                <td>{slide.titulo}</td>
                                <td>{slide.orden}</td>
                                <td>{slide.activo ? 'Activo' : 'Inactivo'}</td>
                                <td>
                                    <button onClick={() => handleEdit(slide)} className="btn-edit">Editar</button>
                                    <button onClick={() => handleDelete(slide.id)} className="btn-delete">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SliderAdmin;
