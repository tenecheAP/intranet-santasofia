import React, { useState, useEffect } from 'react';
import './NewsCarousel.css';

const newsData = [
    {
        id: 1,
        title: 'La Universidad presenta el Protocolo de Atención al Ciudadano',
        image: 'https://via.placeholder.com/800x400?text=Protocolo+Atencion', // Placeholder or use imports
        summary: 'Nuevo lineamiento para mejorar nuestra atención.'
    },
    {
        id: 2,
        title: 'Flash Informativo: Actualización de Sistemas',
        image: 'https://via.placeholder.com/800x400?text=Actualizacion+Sistemas',
        summary: 'Mantenimiento programado para el fin de semana.'
    },
    {
        id: 3,
        title: 'Celebración del Día del Docente',
        image: 'https://via.placeholder.com/800x400?text=Dia+del+Docente',
        summary: 'Únete a nosotros en el auditorio principal.'
    }
];

function NewsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="news-carousel">
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {newsData.map((news) => (
                    <div className="carousel-item" key={news.id}>
                        <img src={news.image} alt={news.title} className="carousel-image" />
                        <div className="carousel-caption">
                            <h3>{news.title}</h3>
                            <p>{news.summary}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="carousel-indicators">
                {newsData.map((_, index) => (
                    <button
                        key={index}
                        className={`indicator ${currentIndex === index ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default NewsCarousel;
