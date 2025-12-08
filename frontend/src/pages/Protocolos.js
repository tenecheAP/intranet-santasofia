import React from 'react';

function Protocolos() {
    return (
        <div className="generic-page">
            <h1>Protocolos Asistenciales</h1>
            <p>Guías estandarizadas para la atención clínica y de enfermería.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Protocolo de Venopunción</h3>
                    <p>Procedimiento estandarizado para la toma de muestras y acceso venoso.</p>
                    <button className="btn-action">Ver Guía Rápida</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Código Azul</h3>
                    <p>Protocolo de actuación frente a una parada cardiorrespiratoria.</p>
                    <button className="btn-action">Descargar Algoritmo</button>
                </div>
            </div>
        </div>
    );
}

export default Protocolos;
