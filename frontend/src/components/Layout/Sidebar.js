// src/components/Layout/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Estilos específicos del Sidebar

// Datos de ejemplo para el menú de la barra lateral (luego vendría de la DB)
const menuItems = [
  { name: 'Inicio', path: '/' },
  { name: 'Plataforma', path: '/plataforma' },
  { name: 'Políticas y Normas', path: '/politicas' },
  { name: 'Gestión de Calidad', path: '/gestion-calidad' },
  { name: 'Gestión de Planeación', path: '/gestion-planeacion' },
  { name: 'Comunicaciones', path: '/comunicaciones' },
  { name: 'Sistemas', path: '/sistemas' },
  { name: 'Guías de Práctica Clínica', path: '/gpc' },
  // ... más elementos de menú
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                end={item.path === '/'}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      {/* Podríamos añadir un widget de notificaciones o accesos rápidos aquí */}
    </aside>
  );
}

export default Sidebar;
