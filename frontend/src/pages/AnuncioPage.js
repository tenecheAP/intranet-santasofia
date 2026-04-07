import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsSidebar from '../components/Home/NewsSidebar';
import { slidersData } from '../data/slidersData';
import './AnuncioPage.css';
import './Home.css'; // Reuse Home grid styles

function AnuncioPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anuncio, setAnuncio] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Encontrar el anuncio en nuestros datos locales
        const item = slidersData.find(s => s.id === parseInt(id));
        if (item) {
            setAnuncio(item);
        }
        setLoading(false);
    }, [id]);

    if (loading) return <div className="loading">Cargando anuncio...</div>;
    if (!anuncio) return (
        <div className="error-container">
            <h2>Error</h2>
            <p>Anuncio no encontrado</p>
            <button onClick={() => navigate('/')} className="btn-primary">Volver al Inicio</button>
        </div>
    );

    return (
        <div className="home-page anuncio-detail-page">
            <div className="home-hero-grid">
                <div className="hero-main">
                    <article className="anuncio-full-view">
                        <div className="anuncio-header">
                            <h1>{anuncio.titulo}</h1>
                            <p className="anuncio-date">Publicado: {new Date().toLocaleDateString()}</p>
                        </div>

                        <div className="anuncio-image-container">
                            <img
                                src={anuncio.imagen_url.startsWith('http') || anuncio.imagen_url.startsWith('/') 
                                    ? anuncio.imagen_url 
                                    : `${process.env.REACT_APP_API_URL || ''}${anuncio.imagen_url}`}
                                alt={anuncio.titulo}
                                className="anuncio-featured-image"
                            />
                        </div>

                        <div className="anuncio-body">
                            {anuncio.contenido ? (
                                <div dangerouslySetInnerHTML={{ __html: anuncio.contenido }} />
                            ) : (
                                <p>{anuncio.resumen}</p>
                            )}
                        </div>

                        <div className="anuncio-footer">
                            <button onClick={() => navigate('/')} className="back-button">
                                ← Volver a Inicio
                            </button>
                        </div>
                    </article>
                </div>

                <div className="hero-sidebar">
                    <NewsSidebar />
                </div>
            </div>
        </div>
    );
}

export default AnuncioPage;
