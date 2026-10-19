// AnalyticsAdmin.jsx
// Admin dashboard for viewing analytics data.
// Utiliza los servicios de analytics.service.js y respeta la paleta de colores existente.

import React, { useState, useEffect } from 'react';
import {
  getOverview,
  getTopPages,
  getVisitsByDate,
  getDeviceStats,
  getBrowserStats,
  getMonthlySummary,
} from '../services/api/analytics.service';
import './AnalyticsAdmin.css';

const AnalyticsAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState(null);
  const [topPages, setTopPages] = useState([]);
  const [visitsByDate, setVisitsByDate] = useState([]);
  const [deviceStats, setDeviceStats] = useState([]);
  const [browserStats, setBrowserStats] = useState([]);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (dateRange.start) params.start = dateRange.start;
      if (dateRange.end) params.end = dateRange.end;

      const [ov, tp, vb, ds, bs] = await Promise.all([
        getOverview(params),
        getTopPages(params),
        getVisitsByDate(params),
        getDeviceStats(params),
        getBrowserStats(params),
      ]);

      setOverview(ov.data);
      setTopPages(tp.data);
      setVisitsByDate(vb.data);
      setDeviceStats(ds.data);
      setBrowserStats(bs.data);
    } catch (error) {
      console.error('Error fetching analytics data', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount (default without date filters)
  useEffect(() => {
    fetchData();
  }, []);

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    fetchData();
  };

  return (
    <div className="analytics-admin">
      <h1 className="page-title">Panel de Analíticas</h1>
      <div className="filters">
        <label>
          Desde:{' '}
          <input type="date" name="start" value={dateRange.start} onChange={handleDateChange} />
        </label>
        <label>
          Hasta:{' '}
          <input type="date" name="end" value={dateRange.end} onChange={handleDateChange} />
        </label>
        <button className="btn-apply" onClick={handleApplyFilters} disabled={loading}>
          {loading ? 'Cargando...' : 'Aplicar'}
        </button>
      </div>

      {overview && (
        <section className="section overview">
          <h2>Resumen General</h2>
          <div className="cards">
            <div className="card">
              <div className="card-title">Visitas Totales</div>
              <div className="card-value">{overview.totalVisits?.toLocaleString() || 0}</div>
            </div>
            <div className="card">
              <div className="card-title">Usuarios Activos</div>
              <div className="card-value">{overview.activeUsers?.toLocaleString() || 0}</div>
            </div>
            <div className="card">
              <div className="card-title">Páginas Únicas</div>
              <div className="card-value">{overview.uniquePages?.toLocaleString() || 0}</div>
            </div>
          </div>
        </section>
      )}

      {/* Top Pages Table */}
      <section className="section top-pages">
        <h2>Páginas Más Visitadas</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>URL</th>
              <th>Visitas</th>
            </tr>
          </thead>
          <tbody>
            {topPages.map((page, idx) => (
              <tr key={page.url}>
                <td>{idx + 1}</td>
                <td>{page.url}</td>
                <td>{page.visits?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Visits By Date (simple list) */}
      <section className="section visits-by-date">
        <h2>Visitas por Día</h2>
        <ul className="visits-list">
          {visitsByDate.map((item) => (
            <li key={item.date}>
              <strong>{item.date}:</strong> {item.visits?.toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      {/* Device Stats */}
      <section className="section device-stats">
        <h2>Dispositivos</h2>
        <ul className="stats-list">
          {deviceStats.map((d) => (
            <li key={d.device}>
              {d.device}: {d.visits?.toLocaleString()}
            </li>
          ))}
        </ul>
      </section>

      {/* Browser Stats */}
      <section className="section browser-stats">
        <h2>Navegadores</h2>
        <ul className="stats-list">
          {browserStats.map((b) => (
            <li key={b.browser}>
              {b.browser}: {b.visits?.toLocaleString()}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AnalyticsAdmin;
