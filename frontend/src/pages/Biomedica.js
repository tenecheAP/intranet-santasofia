import React from 'react';

function Biomedica() {
    return (
        <div className="generic-page">
            <h1>Gestión Biomédica</h1>
            <p>Soporte y mantenimiento de la tecnología médica de la institución.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Solicitud de Mantenimiento</h3>
                    <p>Formulario para reportar fallas en equipos médicos.</p>
                    <button className="btn-action">Crear Ticket</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Cronograma 2025</h3>
                    <p>Planificación de mantenimientos preventivos para el año en curso.</p>
                    <button className="btn-action">Ver Calendario</button>
                </div>
            </div>
        </div>
    );
}

export default Biomedica;
