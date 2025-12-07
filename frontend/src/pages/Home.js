// src/pages/Home.js
import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-page">
      <h1>Bienvenido a la Intranet De Santa Sofía</h1>
      <p>Aquí encontrarás acceso a todos los recursos internos, políticas, manuales y herramientas necesarias para tu trabajo.</p>
      
      <div className="card-grid">
        <div className="info-card">
          <h2>Anuncios Recientes</h2>
          <p>Consulta las últimas novedades y comunicados importantes de la dirección.</p>
          <a href="#" className="card-link">Ver Anuncios</a>
        </div>
        <div className="info-card">
          <h2>Acceso a Sistemas</h2>
          <p>Enlaces directos a Sevenet, Hosvital, Ssofthia y otras aplicaciones internas.</p>
          <Link to="/sistemas" className="card-link">Ir a Sistemas</Link>
        </div>
        <div className="info-card">
          <h2>Documentos Clave</h2>
          <p>Encuentra políticas, procedimientos, manuales y guías de práctica clínica.</p>
          <a href="#" className="card-link">Ver Documentos</a>
        </div>
      </div>

      <p className="welcome-message">
        Recuerda que la información aquí contenida es para uso interno.
      </p>
    </div>
  );
}

export default Home;
