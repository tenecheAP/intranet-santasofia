import React from 'react';

function TalentoHumano() {
    return (
        <div className="generic-page">
            <h1>Talento Humano</h1>
            <p>Servicios, trámites y bienestar para nuestros colaboradores.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Solicitud de Vacaciones</h3>
                    <p>Descarga y diligencia el formato para solicitar tu periodo de vacaciones.</p>
                    <button className="btn-action">Descargar Formato</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Bienestar Laboral</h3>
                    <p>Consulta la agenda de actividades recreativas y de integración de este mes.</p>
                    <button className="btn-action">Ver Agenda</button>
                </div>
            </div>
        </div>
    );
}

export default TalentoHumano;
