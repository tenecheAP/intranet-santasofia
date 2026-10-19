// src/components/Layout/Footer.js
import React from 'react';
import './Footer.css'; // Estilos específicos del Footer

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Intranet Corporativa. Todos los derechos reservados.</p>
      <nav className="footer-nav">
        <a href="/privacidad" className="footer-link">Política de Privacidad</a>
        <a href="/terminos" className="footer-link">Términos de Servicio</a>
        <a href="/contacto" className="footer-link">Contacto</a>
      </nav>
    </footer>
  );
}

export default Footer;