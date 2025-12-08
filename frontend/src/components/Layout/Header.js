import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../Auth/LoginModal';
import './Header.css';
import logo from '../../assets/icons/logo-con-letras-fondo-blanco.png';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="header-wrapper">
      <header className="header-top">
        <div className="header-brand">
          <img src={logo} alt="Logo Santa Sofia" />
          <div className="brand-text">
            <span>E.S.E Hospital Departamental</span>
            <h1>Universitario Santa Sofía de Caldas</h1>
          </div>
        </div>
        <div className="header-actions">
          {user ? (
            <div className="user-menu-container" onMouseLeave={() => setShowUserMenu(false)}>
              <button className="user-action logged-in" onClick={() => setShowUserMenu(!showUserMenu)}>
                <i className="fas fa-user-check"></i> Hola, {user.username}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <button onClick={logout}>Cerrar Sesión</button>
                </div>
              )}
            </div>
          ) : (
            <button className="user-action" onClick={() => setIsLoginOpen(true)}>
              <i className="fas fa-user"></i> Iniciar Sesión de Admin
            </button>
          )}
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

      <nav className="main-navbar">
        <ul className="nav-menu">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
              Inicio
            </NavLink>
          </li>

          <li className="nav-item-dropdown">
            <span className="nav-label">Institucional <i className="fas fa-chevron-down"></i></span>
            <ul className="dropdown-menu">
              <li><NavLink to="/institucional/plataforma">Plataforma Estratégica</NavLink></li>
              <li><NavLink to="/institucional/historia">Historia</NavLink></li>
              <li><NavLink to="/institucional/directorio">Directorio</NavLink></li>
            </ul>
          </li>

          <li className="nav-item-dropdown">
            <span className="nav-label">Procesos <i className="fas fa-chevron-down"></i></span>
            <ul className="dropdown-menu">
              <li><NavLink to="/procesos/mapa">Mapa de Procesos</NavLink></li>
              <li><NavLink to="/procesos/calidad">Gestión de Calidad</NavLink></li>
              <li><NavLink to="/procesos/seguridad-paciente">Seguridad del Paciente</NavLink></li>
            </ul>
          </li>

          <li className="nav-item-dropdown">
            <span className="nav-label">Asistencial <i className="fas fa-chevron-down"></i></span>
            <ul className="dropdown-menu">
              <li><NavLink to="/gpc">Guías de Práctica Clínica</NavLink></li>
              <li><NavLink to="/asistencial/protocolos">Protocolos</NavLink></li>
              <li><NavLink to="/asistencial/biomedica">Gestión Biomédica</NavLink></li>
            </ul>
          </li>

          <li className="nav-item-dropdown">
            <span className="nav-label">Administrativo <i className="fas fa-chevron-down"></i></span>
            <ul className="dropdown-menu">
              <li><NavLink to="/administrativo/talento-humano">Talento Humano</NavLink></li>
              <li><NavLink to="/administrativo/juridica">Jurídica y Contratación</NavLink></li>
              <li><NavLink to="/administrativo/financiera">Gestión Financiera</NavLink></li>
            </ul>
          </li>

          <li>
            <NavLink to="/documental" className={({ isActive }) => isActive ? 'active' : ''}>
              Documental
            </NavLink>
          </li>

          <li>
            <NavLink to="/sistemas" className={({ isActive }) => isActive ? 'active' : ''}>
              Sistemas
            </NavLink>
          </li>

          <li>
            <button className="nav-btn-search" onClick={() => setShowSearch(!showSearch)}>
              <i className="fas fa-search"></i>
            </button>
          </li>
        </ul>
        {showSearch && (
          <div className="search-bar-dropdown">
            <input type="text" placeholder="¿Qué estás buscando?..." autoFocus />
            <button>Buscar</button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header;
