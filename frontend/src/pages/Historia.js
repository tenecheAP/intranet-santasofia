import React from 'react';

function Historia() {
    return (
        <div className="generic-page">
            <h1>Historia Institucional</h1>
            <p>Un recorrido por los hitos que han marcado nuestra trayectoria.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Fundación del Hospital</h3>
                    <p>En el año 19XX, el Hospital Santa Sofía abrió sus puertas con el objetivo de servir a la comunidad de Caldas.</p>
                    <button className="btn-action">Leer más</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Evolución y Modernización</h3>
                    <p>A lo largo de las décadas de los 90 y 2000, la institución se transformó incorporando tecnología de punta.</p>
                    <button className="btn-action">Ver cronología</button>
                </div>
            </div>
        </div>
    );
}

export default Historia;
