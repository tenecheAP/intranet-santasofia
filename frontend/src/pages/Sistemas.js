import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const APPS = [
  { id: 1, name: 'Sistema de Información Softhia RTI', url: 'http://perseo:8181/RTI/', description: 'Recepción y administración de medicamentos en Farmacia, basado en norma NTC-ISO 2859-1, con registro de actas y defectos en lotes.' },
  { id: 2, name: 'Sistema de Información Ssofthia Labind', url: 'http://192.168.40.58:8181/Labind/', description: 'Registro de pacientes e insumos en la toma de muestras de laboratorio clínico; mide tiempos de espera.' },
  { id: 3, name: 'Sistema de Información Ssofthia Contacto', url: 'http://192.168.40.58:8181/CONTACTO/', description: 'Lista de espera para citas de consulta externa o procedimientos ambulatorios no asignables en Hosvital.' },
  { id: 4, name: 'Sistema de Información Ssofthia Negación de Citas', url: 'http://perseo:8181/NegacionCitas/', description: 'Registro de causas y especialidades de negaciones de citas por el centro de contacto.' },
  { id: 5, name: 'Sistema de Información Ssofthia Registro Único de Transfusiones Sanguíneas', url: 'http://perseo:8181/SABANA2014/', description: 'Gestión de solicitud, reserva, envío, devolución y facturación de hemocomponentes (Hemovigilancia).' },
  { id: 6, name: 'Sistema de Información Ssofthia Cambio de Turnos Médicos', url: 'http://amaltea/CAMBIOTURNO/', description: 'Registro de diagnósticos, evolución y procedimientos pendientes para entrega de turno médico.' },
  { id: 7, name: 'Sistema de Información Ssofthia Sala de Espera: SSOFTHIA QUIRÓFANO', url: 'http://perseo:8181/ESPERACX/', description: 'Visualización en sala de espera de cirugías con avisos auditivos y visuales del estado de los procedimientos.' },
  { id: 8, name: 'Sistema de Información de Entrega de Imágenes Diagnósticas', url: 'http://amaltea/ENTREGAIMAGENES/', description: 'Registro de entrega de imágenes diagnósticas a los usuarios.' },
  { id: 9, name: 'Ssofthia Stock de insumos', url: 'http://amaltea/stock/public/', description: 'Control de insumos por servicio mediante lectura de códigos de barras y gestión de fechas de vencimiento.' },
  { id: 10, name: 'Abreviaturas y Acrónimos en la Historia Clínica', url: 'http://amaltea/ACRONIMO/', description: 'Manual de uso de abreviaturas y acrónimos en la historia clínica.' },
  { id: 11, name: 'Sistema de Impresión Cuidados de Enfermería', url: 'http://perseo:8181/CUIDADOSENF/Vista/logueo.jsp?admin=SI', description: 'Visualización e impresión de planes de cuidados de enfermería por pabellón y cama (programados en Hosvital).' },
  { id: 12, name: 'Ssofthia Priorización Cirugías', url: 'http://amaltea/PRIORIZACION/', description: 'Registro de documentación para priorizar procedimientos quirúrgicos.' },
  { id: 13, name: 'Ssofthia Programador Nutriciones Parenterales', url: 'http://192.168.40.58:8081/NPT/index.php', description: 'Generación de nutriciones parenterales en Farmacia según requerimientos del nutricionista.' },
  { id: 14, name: 'Ssofthia sala espera Consulta Externa', url: 'http://amaltea/SALAESPERACE/', description: 'Llamado visible en pantalla para pacientes en sala de espera de consulta externa.' },
  { id: 15, name: 'Ssofthia asistencia a capacitaciones', url: 'http://amaltea/ASISTENCIA/', description: 'Registro de asistencia a capacitaciones mediante código de barras del carnet.' },
  { id: 16, name: 'Ssofthia hojas de vida contratistas', url: 'http://amaltea/HV/', description: 'Registro de datos y documentos de contratistas (certificaciones, vacunas, etc.) con subida de archivos.' },
  { id: 17, name: 'Ssofthia Comprobantes de Egreso', url: 'http://amaltea/COPEGRESO/', description: 'Envío automático de comprobantes de egreso a correos de proveedores.' },
  { id: 18, name: 'Ssofthia cobro deudores', url: 'http://amaltea/DEUDORES/', description: 'Cobro automatizado a deudores mediante correos electrónicos.' },
  { id: 19, name: 'Ssofthia LABWEB', url: 'http://amaltea/LABWEB/', description: 'Consulta, impresión y descarga de resultados de laboratorio; envío de credenciales a pacientes.' },
  { id: 20, name: 'Llamados de Enfermería', url: 'http://internal.medvision.com.co:9090/CallNurseService/Index.html', description: 'Sistema de llamado con notificación en cartelera digital y gestión de indicadores.' },
  { id: 21, name: 'Carteleras Digitales', url: 'http://192.168.40.17:9090/Medvision/NurseF/', description: 'Plataforma para mostrar turnos, videos, imágenes y publicaciones en carteleras según el área.' },
  { id: 22, name: 'Softhia Plan Beneficios Contratos', url: 'http://amaltea/contratoPlanBeneficios/view/modules/login.php', description: 'Asocia contratos con planes de beneficios en el sistema Hosvital.' },
  { id: 23, name: 'Productividad Fonoaudiología y Psicología V.2', url: 'http://192.168.40.101/productividad/', description: 'Sistema de registro de productividad para Fonoaudiología y Psicología.' },
  { id: 24, name: 'Productividad Fisioterapia V.2', url: 'http://192.168.40.101/htdocs/prodfis/', description: 'Sistema de registro de productividad para Fisioterapia.' },
  // Agregamos Mesa de Ayuda como un sistema más
  { id: 99, name: 'Mesa de Ayuda', url: '/mesa-de-ayuda', description: 'Plataforma de soporte y gestión de requerimientos tecnológicos y administrativos.', internalLink: true },
];

function Sistemas() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const qRaw = query.trim();
    if (!qRaw) return APPS;
    const isNumeric = /^\d+$/.test(qRaw);
    if (isNumeric) {
      const qInt = parseInt(qRaw, 10);
      const qPad = qRaw.padStart(2, '0');
      return APPS.filter(a => a.id === qInt || String(a.id).padStart(2, '0') === qPad);
    }
    const q = qRaw.toLowerCase();
    return APPS.filter(a => a.name.toLowerCase().includes(q));
  }, [query]);

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
            <h2>{app.id}. {app.name}</h2>
            <p>{app.description}</p>
            {app.internalLink ? (
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
