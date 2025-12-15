import React, { useState, useEffect } from 'react';
import newsService from '../services/api/news.service';
import { useAuth } from '../context/AuthContext';
// Reuse styles from SliderAdmin for consistency, or we can copy them to NewsAdmin.css
import './SliderAdmin.css';

const NewsAdmin = () => {
    const { user } = useAuth();
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        autor: '',
        resumen: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await newsService.getNews();
            // Sort by date desc
            const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setNews(sorted);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const getDefaultTemplate = (title) => {
        return `
<div class="article-content">
  <p class="lead">Introducción de la noticia: ${title || '...'}</p>

  <div class="info-box">
    <strong>Destacado:</strong> Resumen o frase clave de la noticia.
  </div>

  <h2>Desarrollo</h2>
  <p>Cuerpo de la noticia. Detalla los acontecimientos aquí.</p>
  
  <h3>Conclusión</h3>
  <p>Cierre de la nota informativa.</p>
</div>`.trim();
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Auto-fill template if content is empty when typing title (optional logic, maybe better on a button or distinct trigger)
        // For news, we might just want a button "Insertar Plantilla" or do it on init.
        // Let's stick to simple input change for now.
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const insertTemplate = () => {
        if (!formData.contenido) {
            setFormData(prev => ({
                ...prev,
                contenido: getDefaultTemplate(prev.titulo)
            }));
        } else if (window.confirm('¿Reemplazar contenido actual con la plantilla?')) {
            setFormData(prev => ({
                ...prev,
                contenido: getDefaultTemplate(prev.titulo)
            }));
        }
    }

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('titulo', formData.titulo);
        data.append('contenido', formData.contenido || '');
        data.append('autor', formData.autor || 'Admin');
        data.append('resumen', formData.resumen || ''); // Ensure backend handles resumen if needed, or remove

        if (imageFile) {
            data.append('imagen', imageFile);
        }

        try {
            if (editingId) {
                await newsService.updateNews(editingId, data);
                alert('Noticia actualizada correctamente');
            } else {
                await newsService.createNews(data);
                alert('Noticia creada correctamente');
            }
            handleCancel();
            fetchNews();
        } catch (error) {
            console.error('Error saving news:', error);
            alert('Error al guardar la noticia');
        }
    };

    const handleEdit = (item) => {
        setFormData({
            titulo: item.titulo,
            contenido: item.contenido,
            autor: item.autor || '',
            resumen: item.resumen || ''
        });
        setEditingId(item.id);
        setImageFile(null);
        // Scroll to top
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta noticia?')) {
            try {
                await newsService.deleteNews(id);
                fetchNews();
            } catch (error) {
                console.error('Error deleting news:', error);
            }
        }
    };

    const handleCancel = () => {
        setFormData({ titulo: '', contenido: '', autor: '', resumen: '' });
        setEditingId(null);
        setImageFile(null);
    };

    if (!user || user.role !== 'admin') {
        // return <div className="access-denied">Acceso Denegado</div>; 
        // For development/testing we might bypass, but let's keep it safe.
    }

    return (
        <div className="slider-admin news-admin-container"> {/* Reusing slider-admin class for layout */}
            <h1>Gestión de Noticias</h1>

            <form className="admin-form" onSubmit={handleSubmit}>
                <h2>{editingId ? 'Editar Noticia' : 'Nueva Noticia'}</h2>

                <div className="form-group">
                    <label>Título:</label>
                    <input
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Imagen:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <small>Deja vacío para mantener la imagen actual (al editar).</small>
                </div>

                <div className="form-group">
                    <label>Autor:</label>
                    <input
                        name="autor"
                        value={formData.autor}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>
                        Contenido (HTML):
                        <button type="button" onClick={insertTemplate} className="btn-small" style={{ marginLeft: '10px', padding: '2px 8px' }}>
                            Insertar Plantilla
                        </button>
                    </label>
                    <textarea
                        name="contenido"
                        value={formData.contenido}
                        onChange={handleInputChange}
                        rows="12"
                        required
                    />
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
                <h2>Lista de Noticias</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Img</th>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {news.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    {item.imagen_url && (
                                        <img
                                            src={item.imagen_url.startsWith('http') ? item.imagen_url : `${process.env.REACT_APP_API_URL || ''}${item.imagen_url}`}
                                            alt="mini"
                                            className="table-thumb"
                                        />
                                    )}
                                </td>
                                <td>{item.titulo}</td>
                                <td>{new Date(item.created_at || item.fecha_publicacion).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(item)} className="btn-edit">Editar</button>
                                    <button onClick={() => handleDelete(item.id)} className="btn-delete">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default NewsAdmin;
