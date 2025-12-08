import React from 'react';

function Financiera() {
    return (
        <div className="generic-page">
            <h1>Gestión Financiera</h1>
            <p>Información contable, presupuestal y de facturación.</p>

            <div className="content-grid">
                {/* Ejemplo 1 */}
                <div className="content-card">
                    <h3>Estados Financieros</h3>
                    <p>Informes contables y balance general con corte al último trimestre.</p>
                    <button className="btn-action">Ver Informes</button>
                </div>

                {/* Ejemplo 2 */}
                <div className="content-card">
                    <h3>Certificados de Retención</h3>
                    <p>Plataforma para que proveedores descarguen sus certificados tributarios.</p>
                    <button className="btn-action">Acceder al Portal</button>
                </div>
            </div>
        </div>
    );
}

export default Financiera;
