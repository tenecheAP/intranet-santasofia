// src/pages/Aplicativos.js
import React, { useState } from 'react';
import { aplicativos, getCategorias } from '../data/aplicativos';
import './Aplicativos.css';

function Aplicativos() {
    const [busqueda, setBusqueda] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

    const categorias = getCategorias();

    // Filtrar aplicativos según búsqueda y categoría
    const aplicativosFiltrados = aplicativos.filter(app => {
        const coincideBusqueda = app.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            app.descripcion.toLowerCase().includes(busqueda.toLowerCase());
        const coincideCategoria = categoriaSeleccionada === 'Todas' || app.categoria === categoriaSeleccionada;
        return app.activo && coincideBusqueda && coincideCategoria;
    });

    // Agrupar por categoría
    const aplicativosPorCategoria = {};
    aplicativosFiltrados.forEach(app => {
        if (!aplicativosPorCategoria[app.categoria]) {
            aplicativosPorCategoria[app.categoria] = [];
        }
        aplicativosPorCategoria[app.categoria].push(app);
    });

    const handleAbrirAplicativo = (url, nombre) => {
        if (!url) {
            alert(`El enlace para "${nombre}" aún no está configurado.\nPor favor, agrega la URL en src/data/aplicativos.js`);
            return;
        }
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="aplicativos-page">
            <div className="aplicativos-header">
                <h1>🚀 Aplicativos Institucionales</h1>
                <p>Accede a todos los sistemas y herramientas de la institución</p>
            </div>

            <div className="aplicativos-controles">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="🔍 Buscar aplicativo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="filtros-categoria">
                    <button
                        className={`filtro-btn ${categoriaSeleccionada === 'Todas' ? 'activo' : ''}`}
                        onClick={() => setCategoriaSeleccionada('Todas')}
                    >
                        📂 Todas
                    </button>
                    {categorias.map(categoria => (
                        <button
                            key={categoria}
                            className={`filtro-btn ${categoriaSeleccionada === categoria ? 'activo' : ''}`}
                            onClick={() => setCategoriaSeleccionada(categoria)}
                        >
                            {categoria}
                        </button>
                    ))}
                </div>
            </div>

            {aplicativosFiltrados.length === 0 ? (
                <div className="no-resultados">
                    <p>😕 No se encontraron aplicativos que coincidan con tu búsqueda</p>
                </div>
            ) : (
                <div className="aplicativos-contenido">
                    {Object.keys(aplicativosPorCategoria).sort().map(categoria => (
                        <div key={categoria} className="categoria-seccion">
                            <h2 className="categoria-titulo">
                                <span className="categoria-icono">📁</span>
                                {categoria}
                                <span className="categoria-count">({aplicativosPorCategoria[categoria].length})</span>
                            </h2>

                            <div className="aplicativos-grid">
                                {aplicativosPorCategoria[categoria].map(app => (
                                    <div
                                        key={app.id}
                                        className="aplicativo-card"
                                        onClick={() => handleAbrirAplicativo(app.url, app.nombre)}
                                    >
                                        <div className="aplicativo-icono">{app.icono}</div>
                                        <div className="aplicativo-info">
                                            <h3 className="aplicativo-nombre">{app.nombre}</h3>
                                            <p className="aplicativo-descripcion">{app.descripcion}</p>
                                        </div>
                                        <div className="aplicativo-accion">
                                            {app.url ? (
                                                <span className="btn-abrir">Abrir →</span>
                                            ) : (
                                                <span className="btn-configurar">⚙️ Configurar</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="aplicativos-footer">
                <p>
                    💡 <strong>Nota:</strong> Para agregar o modificar los enlaces, edita el archivo{' '}
                    <code>src/data/aplicativos.js</code>
                </p>
            </div>
        </div>
    );
}

export default Aplicativos;
