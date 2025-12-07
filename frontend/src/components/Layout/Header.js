// src/components/Layout/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Estilos específicos del Header
import logo from '../../assets/icons/logo-con-letras-fondo-blanco.png';

function Header() {
  return (
    <header className="header">
      <div className="header-brand">
        <img src={logo} alt="Logo" />
        <Link to="/" className="header-logo-text">Intranet</Link>
      </div>
      <nav className="header-nav">
        {/* Futuros elementos de navegación superior, búsqueda, usuario, etc. */}
        <input type="search" placeholder="Buscar en la Intranet..." className="search-input" />
        <Link to="/profile" className="nav-item">
          <i className="fas fa-user-circle"></i> Mi Perfil {/* Icono de usuario */}
        </Link>
        {/* Otros enlaces como notificaciones, configuracion, etc. */}
      </nav>
    </header>
  );
}

export default Header;
