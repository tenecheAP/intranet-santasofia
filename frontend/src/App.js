import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import GPC from './pages/GPC';
import Sistemas from './pages/Sistemas';
import Aplicativos from './pages/Aplicativos';
import Documental from './pages/Documental';
import Plataforma from './pages/Plataforma';
import Historia from './pages/Historia';
import Directorio from './pages/Directorio';
import MapaProcesos from './pages/MapaProcesos';
import Calidad from './pages/Calidad';
import SeguridadPaciente from './pages/SeguridadPaciente';
import Protocolos from './pages/Protocolos';
import Biomedica from './pages/Biomedica';
import TalentoHumano from './pages/TalentoHumano';
import Juridica from './pages/Juridica';
import Financiera from './pages/Financiera';
import PlaceholderPage from './pages/PlaceholderPage';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <div className="main-content-wrapper">
            <main className="content-area">
              <Routes>
                <Route path="/" element={<Home />} />

                {/* Institucional */}
                <Route path="/institucional/plataforma" element={<Plataforma />} />
                <Route path="/institucional/historia" element={<Historia />} />
                <Route path="/institucional/directorio" element={<Directorio />} />

                {/* Procesos */}
                <Route path="/procesos/mapa" element={<MapaProcesos />} />
                <Route path="/procesos/calidad" element={<Calidad />} />
                <Route path="/procesos/seguridad-paciente" element={<SeguridadPaciente />} />

                {/* Asistencial */}
                <Route path="/gpc" element={<GPC />} />
                <Route path="/asistencial/protocolos" element={<Protocolos />} />
                <Route path="/asistencial/biomedica" element={<Biomedica />} />

                {/* Administrativo */}
                <Route path="/administrativo/talento-humano" element={<TalentoHumano />} />
                <Route path="/administrativo/juridica" element={<Juridica />} />
                <Route path="/administrativo/financiera" element={<Financiera />} />

                {/* Otros */}
                <Route path="/sistemas" element={<Sistemas />} />
                <Route path="/aplicativos" element={<Aplicativos />} />
                <Route path="/documental" element={<Documental />} />

              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
