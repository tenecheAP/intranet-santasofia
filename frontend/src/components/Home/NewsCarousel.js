import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewsCarousel.css';

function NewsCarousel() {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const baseUrl = process.env.REACT_APP_API_URL || '';
            const url = `${baseUrl}/slider`;
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setSlides(data.filter(s => s.activo));
            }
        } catch (error) {
            console.error('Error loading slides:', error);
        }
    };

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    const handleSlideClick = (slide) => {
        if (slide.es_interno) {
            navigate(`/anuncio/${slide.id}`);
        } else if (slide.link) {
            // Check if link is absolute or relative document
            if (slide.link.startsWith('http')) {
                window.open(slide.link, '_blank');
            } else {
                // If it's a relative path (e.g. /documentos/...), open in new tab
                window.open(slide.link, '_blank');
            }
        }
    };

    const nextSlide = (e) => {
        e && e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = (e) => {
        e && e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    if (slides.length === 0) return null;

    return (
        <div className="news-carousel">
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide) => (
                    <div
                        className="carousel-item"
                        key={slide.id}
                        onClick={() => handleSlideClick(slide)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={slide.imagen_url.startsWith('http')
                                ? slide.imagen_url
                                : `${process.env.REACT_APP_API_URL || ''}${slide.imagen_url}`}
                            alt={slide.titulo}
                            className="carousel-image"
                        />
                        <div className="carousel-caption">
                            <h3>{slide.titulo}</h3>
                            <p>{slide.resumen}</p>
                        </div>
                    </div>
                ))}
            </div>
            {slides.length > 1 && (
                <>
                    <button className="carousel-control prev" onClick={prevSlide}>&#10094;</button>
                    <button className="carousel-control next" onClick={nextSlide}>&#10095;</button>
                    <div className="carousel-indicators">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${currentIndex === index ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToSlide(index);
                                }}
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default NewsCarousel;
