import React, { useState, useEffect } from 'react';
import newsService from '../services/api/news.service';
import './NewsAdmin.css';

const NewsAdmin = () => {
    const [news, setNews] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        contenido: '',
        imagen_url: '',
        autor: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await newsService.getNews();
            setNews(data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await newsService.updateNews(editingId, formData);
            } else {
                await newsService.createNews(formData);
            }
            setFormData({ titulo: '', contenido: '', imagen_url: '', autor: '' });
            setEditingId(null);
            fetchNews();
        } catch (error) {
            console.error('Error saving news:', error);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            titulo: item.titulo,
            contenido: item.contenido,
            imagen_url: item.imagen_url || '',
            autor: item.autor || ''
        });
        setEditingId(item.id);
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

    return (
        <div className="news-admin">
            <h1>Gestión de Noticias</h1>

            <div className="admin-grid">
                <div className="form-section">
                    <h2>{editingId ? 'Editar Noticia' : 'Nueva Noticia'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Título</label>
                            <input
                                type="text"
                                value={formData.titulo}
                                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Imagen URL</label>
                            <input
                                type="text"
                                value={formData.imagen_url}
                                onChange={(e) => setFormData({ ...formData, imagen_url: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Autor</label>
                            <input
                                type="text"
                                value={formData.autor}
                                onChange={(e) => setFormData({ ...formData, autor: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Contenido</label>
                            <textarea
                                value={formData.contenido}
                                onChange={(e) => setFormData({ ...formData, contenido: e.target.value })}
                                rows="6"
                                required
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="save-btn">
                                {editingId ? 'Actualizar' : 'Crear'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => {
                                        setEditingId(null);
                                        setFormData({ titulo: '', contenido: '', imagen_url: '', autor: '' });
                                    }}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="list-section">
                    <h2>Noticias Existentes</h2>
                    <div className="admin-news-list">
                        {news.map((item) => (
                            <div key={item.id} className="admin-news-item">
                                {item.imagen_url && (
                                    <img
                                        src={item.imagen_url}
                                        alt="thumb"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px', marginRight: '1rem' }}
                                    />
                                )}
                                <div className="item-info" style={{ flex: 1 }}>
                                    <h3>{item.titulo}</h3>
                                    <span className="item-date">
                                        {new Date(item.fecha_publicacion).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="item-actions">
                                    <button onClick={() => handleEdit(item)} className="edit-btn">Editar</button>
                                    <button onClick={() => handleDelete(item.id)} className="delete-btn">Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsAdmin;
