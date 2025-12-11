import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AnuncioPage.css';

function AnuncioPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [anuncio, setAnuncio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnuncio = async () => {
            try {
                const response = await fetch(`/slider/${id}`);
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
            <button onClick={() => navigate('/')}>Volver al Inicio</button>
        </div>
    );
    if (!anuncio) return null;

    return (
        <div className="anuncio-page">
            <div className="anuncio-header">
                <img
                    src={anuncio.imagen_url.startsWith('http') ? anuncio.imagen_url : anuncio.imagen_url}
                    alt={anuncio.titulo}
                    className="anuncio-image"
                />
                <h1>{anuncio.titulo}</h1>
            </div>
            <div className="anuncio-content">
                <div dangerouslySetInnerHTML={{ __html: anuncio.contenido }} />
            </div>
            <div className="anuncio-footer">
                <button onClick={() => navigate('/')} className="back-button">Volver</button>
            </div>
        </div>
    );
}

export default AnuncioPage;
