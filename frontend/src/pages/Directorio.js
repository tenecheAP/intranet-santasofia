import React from 'react';

function Directorio() {
    return (
        <div className="generic-page">
            <h1>Directorio Institucional</h1>
            <p>Encuentra aquí los contactos de las diferentes áreas y dependencias.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Extensiones Administrativas</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><strong>Gerencia:</strong> Ext. 1001</li>
                        <li><strong>Recursos Humanos:</strong> Ext. 1005</li>
                        <li><strong>Contabilidad:</strong> Ext. 1010</li>
                    </ul>
                    <button className="btn-action">Ver listado completo</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Directorio Médico</h3>
                    <p>Contactos directos de los puestos de enfermería y especialidades.</p>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li><strong>Urgencias:</strong> Ext. 2000</li>
                        <li><strong>UCI:</strong> Ext. 2020</li>
                    </ul>
                    <button className="btn-action">Buscar especialista</button>
                </div>
            </div>
        </div>
    );
}

export default Directorio;
