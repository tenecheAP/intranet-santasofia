import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import NewsCarousel from '../components/Home/NewsCarousel';
import NewsSidebar from '../components/Home/NewsSidebar';

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero-grid">
        <div className="hero-main">
          <NewsCarousel />

          <div className="welcome-section">
            <h1>Bienvenido a la Intranet de Santa Sofía</h1>
            <p>Accede a todos los recursos, noticias y aplicativos institucionales.</p>
          </div>
        </div>
        <div className="hero-sidebar">
          <NewsSidebar />
        </div>
      </div>

      <div className="section-divider">
        <h2>Noticias Destacadas</h2>
        <hr />
        <p className="section-subtitle">Lo último que sucede en nuestra institución</p>
      </div>

      {/* We reuse the logic but in a grid format, or could be a NEW component */}
      {/* For now, let's link to the full news page prominently */}
      <div className="news-preview-banner" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <Link to="/noticias" className="btn-primary" style={{
          display: 'inline-block',
          padding: '1rem 2rem',
          backgroundColor: '#0056b3',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}>
          📰 Ver Todas las Noticias Institucionales
        </Link>
      </div>

      <div className="section-divider">
        <h2>Accesos Rápidos</h2>
        <hr />
      </div>

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
          <Link to="/documental" className="card-link">Ver Documentos</Link>
        </div>
      </div>

      <p className="welcome-message">
        Recuerda que la información aquí contenida es para uso interno.
      </p>
    </div>
  );
}

export default Home;
