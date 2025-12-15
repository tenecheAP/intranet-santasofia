import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../services/api/news.service';
import './NewsPage.css';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const data = await newsService.getNews();
            setNews(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('No se pudieron cargar las noticias. Verifique que el servidor esté activo.');
        } finally {
            setLoading(false);
        }
    };

    const stripHtml = (html) => {
        if (!html) return '';
        const tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    );

    if (error) return (
        <div className="news-page">
            <h1>Noticias Institucionales</h1>
            <div className="error-message" style={{ textAlign: 'center', color: '#dc3545', padding: '2rem' }}>
                <h2>⚠️ Error</h2>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div className="news-page">
            <h1>Noticias Institucionales</h1>
            <div className="news-grid">
                {news.map((item) => (
                    <Link
                        to={`/noticias/${item.id}`}
                        key={item.id}
                        className="news-card"
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        <div className="news-image">
                            <img
                                src={item.imagen_url ? (item.imagen_url.startsWith('http') ? item.imagen_url : `${process.env.REACT_APP_API_URL || ''}${item.imagen_url}`) : 'https://via.placeholder.com/600x400?text=Noticias+Institucionales'}
                                alt={item.titulo}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/600x400?text=Santa+Sofia';
                                }}
                            />
                        </div>
                        <div className="news-content">
                            <div className="news-badgets">
                                <span className="news-tag">Institucional</span>
                            </div>
                            <h2>{item.titulo}</h2>
                            <div className="news-meta">
                                <span className="news-date">
                                    📅 {new Date(item.fecha_publicacion).toLocaleDateString()}
                                </span>
                                {item.autor && (
                                    <span className="news-author">
                                        ✍️ {item.autor}
                                    </span>
                                )}
                            </div>
                            <p className="news-excerpt">
                                {stripHtml(item.contenido).substring(0, 150)}...
                            </p>
                            <span className="read-more">Leer noticia completa</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
