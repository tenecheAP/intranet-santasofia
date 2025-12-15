import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewsSidebar from '../components/Home/NewsSidebar';
import './AnuncioPage.css';
import './Home.css'; // Reuse Home grid styles

function AnuncioPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anuncio, setAnuncio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnuncio = async () => {
            try {
                const baseUrl = process.env.REACT_APP_API_URL || '';
                const response = await fetch(`${baseUrl}/slider/${id}`);
                if (!response.ok) {
                    throw new Error('Anuncio no encontrado');
                }
                const data = await response.json();
                setAnuncio(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnuncio();
    }, [id]);

    if (loading) return <div className="loading">Cargando anuncio...</div>;
    if (error) return (
        <div className="error-container">
            <h2>Error</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="btn-primary">Volver al Inicio</button>
        </div>
    );
    if (!anuncio) return null;

    return (
        <div className="home-page anuncio-detail-page">
            <div className="home-hero-grid">
                <div className="hero-main">
                    <article className="anuncio-full-view">
                        <div className="anuncio-header">
                            <h1>{anuncio.titulo}</h1>
                            <p className="anuncio-date">Publicado: {new Date(anuncio.created_at).toLocaleDateString()}</p>
                        </div>

                        <div className="anuncio-image-container">
                            <img
                                src={anuncio.imagen_url.startsWith('http') ? anuncio.imagen_url : `${process.env.REACT_APP_API_URL || ''}${anuncio.imagen_url}`}
                                alt={anuncio.titulo}
                                className="anuncio-featured-image"
                            />
                        </div>

                        <div className="anuncio-body">
                            <div dangerouslySetInnerHTML={{ __html: anuncio.contenido }} />
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
