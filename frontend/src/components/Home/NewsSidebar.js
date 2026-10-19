import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import newsService from '../../services/api/news.service';
import './NewsSidebar.css';

function NewsSidebar() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsService.getNews();
                // Take only the first 5 items
                setNews(data.slice(0, 5));
            } catch (error) {
                console.error('Error loading news:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <aside className="news-sidebar">
            <div className="news-sidebar-header">
                <h3>Últimas Noticias</h3>
                <Link to="/noticias" className="view-all">Ver todas</Link>
            </div>
            <div className="news-list">
                {news.length === 0 ? (
                    <p className="no-news">No hay noticias recientes</p>
                ) : (
                    news.map((item) => (
                        <div className="news-item" key={item.id}>
                            <span className="news-date">
                                {new Date(item.fecha_publicacion).toLocaleDateString()}
                            </span>
                            <Link to={`/noticias/${item.id}`} className="news-title">{item.titulo}</Link>
                        </div>
                    ))
                )}
            </div>
            <div className="quick-links">
                <h4>Enlaces de Interés</h4>
                <ul>
                    <li>
                        <a href="https://mail.google.com/mail/" target="_blank" rel="noopener noreferrer">
                            Correo Institucional
                        </a>
                    </li>
                    <li>
                        <Link to="/sistemas">
                            Sistemas (Software Propio)
                        </Link>
                    </li>
                    <li>
                        <a href="https://www.santasofia.gov.co/" target="_blank" rel="noopener noreferrer">
                            Portal Web Santa Sofía
                        </a>
                    </li>
                    <li>
                        <Link to="/documental">
                            Gestión Documental
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default NewsSidebar;
