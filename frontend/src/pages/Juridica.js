import React from 'react';

function Juridica() {
    return (
        <div className="generic-page">
            <h1>Jurídica y Contratación</h1>
            <p>Marco legal y procesos de contratación institucional.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Manual de Contratación</h3>
                    <p>Reglamento interno que rige los procesos de adquisición de bienes y servicios.</p>
                    <button className="btn-action">Ver Manual</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Formatos de Minutas</h3>
                    <p>Repositorio de modelos para contratos de prestación de servicios y suministros.</p>
                    <button className="btn-action">Ir al Repositorio</button>
                </div>
            </div>
        </div>
    );
}

export default Juridica;
