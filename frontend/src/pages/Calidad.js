import React from 'react';

function Calidad() {
    return (
        <div className="generic-page">
            <h1>Gestión de Calidad</h1>
            <p>Recursos para el aseguramiento de la calidad y la mejora continua.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Manual de Calidad</h3>
                    <p>Documento maestro que establece las directrices de nuestro sistema de gestión.</p>
                    <button className="btn-action">Ver Documento</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Tablero de Indicadores</h3>
                    <p>Resultados mensuales de los indicadores de gestión por área.</p>
                    <button className="btn-action">Consultar Dashboard</button>
                </div>
            </div>
        </div>
    );
}

export default Calidad;
