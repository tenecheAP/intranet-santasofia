import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import newsService from '../services/api/news.service';
import './NewsDetail.css';

const NewsDetail = () => {
    const { id } = useParams();
    const [newsItem, setNewsItem] = useState(null);
    const [sidebarNews, setSidebarNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch the specific news item
                const item = await newsService.getNewsById(id);
                setNewsItem(item);

                // Fetch all news for the sidebar (excluding current one)
                const allNews = await newsService.getNews();
                const others = allNews.filter(n => n.id !== parseInt(id)).slice(0, 5);
                setSidebarNews(others);
            } catch (err) {
                console.error('Error loading news detail:', err);
                setError('No se pudo cargar la noticia.');
            } finally {
                setLoading(false);
            }
        };

        loadData();
        // Scroll to top when id changes
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    );

    if (error || !newsItem) return (
        <div className="news-detail-container error-state">
            <h2>⚠️ Error</h2>
            <p>{error || 'Noticia no encontrada'}</p>
            <Link to="/noticias" className="back-link">Volver a noticias</Link>
        </div>
    );

    return (
        <div className="news-detail-page">
            <div className="news-detail-layout">
                {/* Main Content - Now on Left/Center for standard news flow */}
                <main className="detail-content">
                    <article>
                        <header className="article-header">
                            <Link to="/noticias" className="back-nav">
                                <span>←</span> Volver al listado
                            </Link>

                            <h1>{newsItem.titulo}</h1>

                            <div className="article-meta">
                                <span className="date">
                                    📅 {new Date(newsItem.fecha_publicacion).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                {newsItem.autor && (
                                    <span className="author">
                                        ✍️ Por: {newsItem.autor}
                                    </span>
                                )}
                            </div>
                        </header>

                        {newsItem.imagen_url && (
                            <div className="article-image">
                                <img
                                    src={newsItem.imagen_url.startsWith('http') ? newsItem.imagen_url : `${process.env.REACT_APP_API_URL || ''}${newsItem.imagen_url}`}
                                    alt={newsItem.titulo}
                                />
                            </div>
                        )}

                        <div
                            className="article-body article-content" // Added article-content class for styling
                            dangerouslySetInnerHTML={{ __html: newsItem.contenido }}
                        />
                    </article>
                </main>

                {/* Right Sidebar */}
                <aside className="detail-sidebar">
                    <div className="sidebar-container">
                        <h3>Otras Noticias</h3>
                        <div className="sidebar-list">
                            {sidebarNews.map(item => (
                                <Link to={`/noticias/${item.id}`} key={item.id} className="sidebar-item">
                                    {item.imagen_url && (
                                        <img
                                            src={item.imagen_url.startsWith('http') ? item.imagen_url : `${process.env.REACT_APP_API_URL || ''}${item.imagen_url}`}
                                            alt={item.titulo}
                                            className="sidebar-thumb"
                                        />
                                    )}
                                    <div className="sidebar-info">
                                        <h4>{item.titulo}</h4>
                                        <span className="sidebar-date">
                                            {new Date(item.fecha_publicacion).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default NewsDetail;
