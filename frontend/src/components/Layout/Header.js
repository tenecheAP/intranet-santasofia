import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoginModal from '../Auth/LoginModal';
import { Mail, Headphones, Phone, Monitor, FileText, LifeBuoy } from 'lucide-react';
import './Header.css';
import logo from '../../assets/icons/logo-con-letras-fondo-blanco.png';
import almeraLogo from '../../assets/icons/almera.png';
import * as dbService from '../../services/api/db.service';

function Header() {
  const [showSearch, setShowSearch] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleExportDB = async () => {
    try {
      await dbService.downloadBackup();
    } catch (error) {
      alert('Error al exportar la base de datos');
    }
  };

  const handleImportDB = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!window.confirm('¿Estás seguro de restaurar la base de datos? Esto sobrescribirá los datos actuales.')) {
      e.target.value = '';
      return;
    }

    try {
      await dbService.restoreBackup(file);
      alert('Base de datos restaurada correctamente. La página se recargará.');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Error al restaurar la base de datos: ' + error.message);
    } finally {
      e.target.value = '';
    }
  };

  return (
    <div className="header-wrapper">
      <header className="header-top">
        <div className="header-brand">
          <img src={logo} alt="Logo Santa Sofia" />
          <div className="brand-text">
            <span>E.S.E Hospital Departamental</span>
            <h1>Universitario Santa Sofía de Caldas</h1>
            <div className="brand-support-info">
              <Headphones size={12} /> Soporte Sistemas (Fuera de oficina): <strong>3206208568</strong>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <Link
            to="/documental"
            className="action-icon-btn contingency-action"
            title="Gestión Documental"
          >
            <FileText size={20} />
          </Link>

          <Link
            to="/institucional/directorio"
            className="action-icon-btn directory-action"
            title="Directorio Telefónico"
          >
            <Phone size={20} />
          </Link>

          <Link
            to="/sistemas"
            className="action-icon-btn apps-action"
            title="Sistemas y Aplicativos"
          >
            <Monitor size={20} />
          </Link>

          <a
            href="https://mail.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="action-icon-btn email-action"
            title="Correo Institucional"
          >
            <Mail size={20} />
          </a>

          <Link
            to="/mesa-de-ayuda"
            className="action-icon-btn help-action"
            title="Mesa de Ayuda"
          >
            <Headphones size={20} />
          </Link>

          <a
            href="https://sgi.almeraim.com/sgi/index.php?conid=sgihss&amp;" /* URL supuesta, favor verificar */
            target="_blank"
            rel="noopener noreferrer"
            className="action-icon-btn almera-action"
            title="Almera"
          >
            <img src={almeraLogo} alt="Almera" />
          </a>

          <a
            href="https://forms.gle/841p3Dwbh2xUZgxG8"
            target="_blank"
            rel="noopener noreferrer"
            className="action-icon-btn support-action"
            title="Soporte Sistemas / Reportar Error"
          >
            <LifeBuoy size={20} />
          </a>

          {user ? (
            <div className="user-menu-container" onMouseLeave={() => setShowUserMenu(false)}>
              <button className="user-action logged-in" onClick={() => setShowUserMenu(!showUserMenu)}>
                <i className="fas fa-user-check"></i> Hola, {user.username}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <Link to="/admin/slider" className="dropdown-item">Gestionar Slider</Link>
                  <Link to="/admin/news" className="dropdown-item">Gestionar Noticias</Link>
                  <Link to="/admin/sistemas" className="dropdown-item">Gestionar Sistemas</Link>
                  <Link to="/admin/notificaciones" className="dropdown-item">Gestionar Notificaciones</Link>
                  <hr />
                  <button onClick={handleExportDB} className="dropdown-item">Exportar Base de Datos</button>
                  <label className="dropdown-item" style={{ cursor: 'pointer' }}>
                    Restaurar Base de Datos
                    <input type="file" accept=".sql" onChange={handleImportDB} style={{ display: 'none' }} />
                  </label>
                  <hr />
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
            <NavLink to="/indicadores" className={({ isActive }) => isActive ? 'active' : ''}>
              Indicadores
            </NavLink>
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
