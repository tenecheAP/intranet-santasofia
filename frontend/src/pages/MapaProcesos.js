import React, { useState } from 'react';
import './MapaProcesos.css';

function MapaProcesos() {
    const [showMap, setShowMap] = useState(false);

    // CONFIGURACIÓN: Apuntamos directamente a la API para evitar problemas de proxy
    // El nombre del archivo DEBE coincidir con el que está en backend/uploads/documents/
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
    const fileName = "Mapa-de-procesos 2019.jpg";
    const MAPA_IMAGEN_SRC = `${API_URL}/uploads/documents/${encodeURIComponent(fileName)}`;

    const pdfName = "mapa de procesos-DIC-2019.pdf";
    const MAPA_PDF_SRC = `${API_URL}/uploads/documents/${encodeURIComponent(pdfName)}`;

    return (
        <div className="generic-page">
            <h1>Mapa de Procesos</h1>
            <p>Visualización de nuestros procesos.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Mapa Interactivo 2025</h3>
                    <p>Navega por los procesos Estratégicos, Misionales, de Apoyo y de Evaluación.</p>
                    <button className="btn-action" onClick={() => setShowMap(true)}>Abrir Mapa</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Caracterización de Procesos</h3>
                    <p>Documentos detallados con las entradas, salidas y actividades de cada proceso.</p>
                    <a href={MAPA_PDF_SRC} target="_blank" rel="noopener noreferrer" className="btn-action" style={{ display: 'inline-block', textDecoration: 'none', textAlign: 'center' }}>
                        Descargar PDF
                    </a>
                </div>
            </div>

            {/* Modal de Mapa */}
            {showMap && (
                <div className="modal-overlay" onClick={() => setShowMap(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setShowMap(false)}>&times;</button>
                        <img
                            src={MAPA_IMAGEN_SRC}
                            alt="Mapa de Procesos"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/800x600?text=Imagen+no+encontrada+(/mapa_procesos.jpg)";
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MapaProcesos;
