import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { sistemasData } from '../data/sistemasData';

function Sistemas() {
  const [apps] = useState(sistemasData);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const qRaw = query.trim();
    if (!qRaw) return apps;

    // Si buscamos por número (ID)
    const isNumeric = /^\d+$/.test(qRaw);
    if (isNumeric) {
      const qInt = parseInt(qRaw, 10);
      return apps.filter(a => a.id === qInt || String(a.id).includes(qRaw));
    }

    const q = qRaw.toLowerCase();
    return apps.filter(a =>
      a.nombre.toLowerCase().includes(q) ||
      (a.descripcion && a.descripcion.toLowerCase().includes(q))
    );
  }, [query, apps]);

  return (
    <div className="home-page">
      <h1>Aplicativos de Software Propio</h1>
      <p>Busca por nombre o número para acceder rápidamente.</p>

      <div style={{ marginBottom: '16px' }}>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar por nombre o número..."
          className="search-input"
          style={{ width: '100%', maxWidth: 480 }}
        />
      </div>

      <div className="card-grid">
        {filtered.map(app => (
          <div className="info-card" key={app.id}>
            <h2>{app.id}. {app.nombre}</h2>
            <p>{app.descripcion}</p>
            {app.interno ? (
              <Link to={app.url} className="card-link">Abrir</Link>
            ) : (
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="card-link">Abrir</a>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="info-card">
            <h2>Sin resultados</h2>
            <p>No se encontraron sistemas para tu búsqueda.</p>
            <button onClick={() => setQuery('')} className="card-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Ver todos</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sistemas;
