// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import GPC from './pages/GPC';
import Sistemas from './pages/Sistemas';
// Importa otras páginas aquí a medida que las crees
import './App.css'; // Estilos específicos de la aplicación principal

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content-wrapper">
          <Sidebar />
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gpc" element={<GPC />} />
              <Route path="/sistemas" element={<Sistemas />} />
              {/* Aquí irán tus otras rutas: */}
              {/* <Route path="/plataforma" element={<PlataformaPage />} /> */}
              {/* <Route path="/politicas" element={<PoliticasPage />} /> */}
              {/* <Route path="/gestion-planeacion/planes" element={<DocumentListPage categoryId="planes" />} /> */}
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
