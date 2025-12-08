import React from 'react';

function MapaProcesos() {
    return (
        <div className="generic-page">
            <h1>Mapa de Procesos</h1>
            <p>Visualización interactiva y documentación de nuestros procesos.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Mapa Interactivo 2025</h3>
                    <p>Navega por los procesos Estratégicos, Misionales, de Apoyo y de Evaluación.</p>
                    <button className="btn-action">Abrir Mapa</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Caracterización de Procesos</h3>
                    <p>Documentos detallados con las entradas, salidas y actividades de cada proceso.</p>
                    <button className="btn-action">Descargar PDF</button>
                </div>
            </div>
        </div>
    );
}

export default MapaProcesos;
