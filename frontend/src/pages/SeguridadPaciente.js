import React from 'react';

function SeguridadPaciente() {
    return (
        <div className="generic-page">
            <h1>Seguridad del Paciente</h1>
            <p>Comprometidos con la seguridad y el bienestar de nuestros usuarios.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Protocolo de Lavado de Manos</h3>
                    <p>Guía esencial para la prevención de infecciones asociadas a la atención en salud.</p>
                    <button className="btn-action">Ver Protocolo</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Reporte de Eventos Adversos</h3>
                    <p>Plataforma para el reporte confidencial de incidentes y eventos adversos.</p>
                    <button className="btn-action">Reportar Evento</button>
                </div>
            </div>
        </div>
    );
}

export default SeguridadPaciente;
