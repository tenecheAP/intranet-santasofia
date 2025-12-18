import React, { useState, useMemo } from 'react';
import { FileText, Folder, Calendar, ArrowLeft, Search, ExternalLink, FileSpreadsheet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './IndicatorsPage.css';

const YEARS = [
    { year: 2025, active: true },
    { year: 2024, active: true },
    { year: 2023, active: true },
    { year: 2022, active: true },
    { year: 2021, active: true },
    { year: 2020, active: true },
    { year: 2019, active: true },
    { year: 2018, active: true },
    { year: 2017, active: true },
    { year: 2016, active: true },
    { year: 2015, active: true },
    { year: 2014, active: true },
    { year: 2013, active: true },
    { year: 2012, active: true },
    { year: 2011, active: true },
    { year: 2010, active: true },
    { year: 'Plan de Gestión 2008-2009', active: true }
];

const NETWORK_BASE_URL = 'http://192.168.40.112/indicadores/Indicadores_y_Estadisticas_2025/';

const DASHBOARD_DATA_2025 = [
    { name: '1. CUADRO DE MANDO INTEGRAL 2024', type: 'folder', priority: true },
    { name: '2. PLANES DE ACCIÓN', type: 'folder', priority: true },
    { name: '3. RESUMEN INDICADORES POR PROCESO', type: 'folder', priority: true },
    { name: '4. PLANES DE MEJORAMIENTO', type: 'folder', priority: true },
    { name: '5. PLAN DE INVERSIÓN', type: 'folder', priority: true },
    { name: '7. Evaluacion Gestion por Dependencia', type: 'folder', priority: true },
    { name: '8. MAPA DE RIESGOS POR PROCESO 2022', type: 'folder', priority: true },
    { name: 'Cuadro-General-Estadisticas-2025.xls', type: 'excel', priority: true },
    { name: 'Entrega de turno bueno.xlsx', type: 'excel', priority: false },
    { name: 'Acreditacion', type: 'folder', isProcess: true },
    { name: 'Adminstración de las Tecnolgías de Información y Comunicaciones', type: 'folder', isProcess: true },
    { name: 'Admision al Usuario', type: 'folder', isProcess: true },
    { name: 'Almacen', type: 'folder', isProcess: true },
    { name: 'Asesoria Juridica', type: 'folder', isProcess: true },
    { name: 'Aten. Integ. al Paciente en el Servicio de Apoyo Diagnóstico y Terapeutico', type: 'folder', isProcess: true },
    { name: 'Aten. Integ. al Paciente en el servicio de Consulta Externa', type: 'folder', isProcess: true },
    { name: 'Aten. Integ. al Paciente en el servicio de Cuidado Crítico', type: 'folder', isProcess: true },
    { name: 'Aten. Integ. al Paciente en el servicio de Hospitalizacion', type: 'folder', isProcess: true },
    { name: 'Aten. Integ. al Paciente en el servicio de Quirofanos', type: 'folder', isProcess: true },
    { name: 'Aten. Integ. al Paciente en el servicio de Urgencias', type: 'folder', isProcess: true },
    { name: 'Auditoria Medica', type: 'folder', isProcess: true },
    { name: 'Contratacion con Pagadores', type: 'folder', isProcess: true },
    { name: 'Contratacion de Bienes y Servicios', type: 'folder', isProcess: true },
    { name: 'Control Interno de Gestión', type: 'folder', isProcess: true },
    { name: 'Direccionamiento Estratégico', type: 'folder', isProcess: true },
    { name: 'Facturacion de Venta de Servicios', type: 'folder', isProcess: true },
    { name: 'Financiera', type: 'folder', isProcess: true },
    { name: 'Garantia de Calidad', type: 'folder', isProcess: true },
    { name: 'Gestion Ambiental', type: 'folder', isProcess: true },
    { name: 'Gestion de Apoyo Logístico', type: 'folder', isProcess: true },
    { name: 'Gestion de Atencion al Usuario', type: 'folder', isProcess: true },
    { name: 'Gestion de Comunicacion', type: 'folder', isProcess: true },
    { name: 'Gestion de Investigacion y Entrenamiento', type: 'folder', isProcess: true },
    { name: 'Gestion de la Planeacion', type: 'folder', isProcess: true },
    { name: 'Gestion de Mercadeo', type: 'folder', isProcess: true },
    { name: 'Gestion de Tecnologia Biomedica', type: 'folder', isProcess: true },
    { name: 'Gestion Documental', type: 'folder', isProcess: true },
    { name: 'Gestion Documental Clinica', type: 'folder', isProcess: true },
    { name: 'Gestion Financiera', type: 'folder', isProcess: true },
    { name: 'Gestion Servicio Farmaceutico', type: 'folder', isProcess: true },
    { name: 'Gestion y Administracion del Talento Humano', type: 'folder', isProcess: true },
    { name: 'Proyeccion_Operacional', type: 'folder', isProcess: true },
];

const INDICATOR_GROUPS = [
    // ... rest of INDICATOR_GROUPS
    {
        title: 'EVALUACIÓN DE GESTIÓN POR DEPENDENCIA',
        type: 'Institucional',
        items: ['Evaluación de Gestión por Dependencia 2025']
    },
    {
        title: 'CUADRO DE MANDO INTEGRAL',
        type: 'Institucional',
        items: ['Cuadro de Mando Integral 2025']
    },
    {
        title: 'PLANES DE ACCION 2025',
        type: 'Institucional',
        items: ['Planes de Acción', 'Seguimiento a Planes de Acción 2025']
    },
    {
        title: 'MAPA DE RIESGOS POR PROCESO 2025',
        type: 'Institucional',
        items: ['Mapa de Riesgos por Proceso 2025']
    },
    {
        title: 'PLAN OPERATIVO ANUAL DE INVERSIÓN',
        type: 'Institucional',
        items: ['Plan de Inversión 2025']
    },
    {
        title: 'PLANES DE MEJORAMIENTO',
        type: 'Institucional',
        items: ['Planes de Mejoramiento 2025']
    },
    {
        title: 'RESUMEN INDICADORES POR PROCESOS',
        type: 'Institucional',
        items: ['Resumen Indicadores Por Proceso 2025']
    },
    {
        title: 'INDICADORES Y ESTADISTICAS 2025',
        type: 'Institucional',
        items: [
            'Cuadro General Estadísticas 2025',
            'Información Estadística Mensual'
        ]
    },
    {
        title: 'INDICADORES POR PROCESOS 2025',
        type: 'Proceso',
        items: [
            'Admisión al usuario',
            'Administración de las Tecnologías de Información y Comunicaciones',
            'Compras y Suministros',
            'Asesoría Jurídica',
            'Aten. Integ. al Paciente en el servicio de Apoyo Diagnóstico y Terapéutico',
            'Aten. Integ. al Paciente en el servicio de Consulta Externa',
            'Aten. Integ. al Paciente en el servicio de Cuidado Crítico',
            'Aten. Integ. al Paciente en el servicio de Quirófanos',
            'Aten. Integ. al Paciente en el servicio de Hospitalización',
            'Aten. Integ. al Paciente en el servicio de Urgencias',
            'Auditoria Medica',
            'Contratación con Pagadores',
            'Contratación de Bienes y Servicios',
            'Control Interno de Gestión',
            'Costeo Institucional',
            'Direccionamiento Estratégico',
            'Facturación de Venta de Servicios',
            'Gestión Ambiental',
            'Gestión de Apoyo Logístico',
            'Gestión de Atención al Usuario',
            'Garantía de Calidad',
            'Gestión de Comunicación',
            'Gestión Documental',
            'Gestión de Investigación y Entrenamiento',
            'Gestión de Mercadeo',
            'Gestión de Planeación',
            'Gestión de Servicio Farmacéutico',
            'Gestión de Technology Biomédica',
            'Gestión Financiera',
            'Gestión y Administración del Talento Humano'
        ]
    }
];

const IndicatorsPage = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleYearClick = (yearItem) => {
        setSelectedYear(yearItem);
        setSearchTerm('');
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setSelectedYear(null);
    };

    // Dashboard Helper Functions for 2025
    const encodeUrl = (name) => {
        const cleanName = name.endsWith('/') ? name.slice(0, -1) : name;
        return `${NETWORK_BASE_URL}${encodeURIComponent(cleanName)}${name.endsWith('/') ? '/' : ''}`;
    };

    const dashboardFilteredData = useMemo(() => {
        if (selectedYear?.year !== 2025) return [];
        const lowerSearch = searchTerm.toLowerCase();
        return DASHBOARD_DATA_2025.filter(item =>
            item.name.toLowerCase().includes(lowerSearch)
        );
    }, [selectedYear, searchTerm]);

    const renderDashboardContent = () => {
        const priorityItems = dashboardFilteredData.filter(item => item.priority);
        const processItems = dashboardFilteredData.filter(item => item.isProcess);

        return (
            <div className="dashboard-content-integrated">
                {priorityItems.length > 0 && (
                    <div className="dashboard-section-integ">
                        <h3 className="section-title-integ">📊 Principales</h3>
                        <div className="indicator-grid-integ">
                            {priorityItems.map(item => renderDashboardCard(item))}
                        </div>
                    </div>
                )}
                {processItems.length > 0 && (
                    <div className="dashboard-section-integ">
                        <h3 className="section-title-integ">📂 Procesos</h3>
                        <div className="indicator-grid-integ">
                            {processItems.map(item => renderDashboardCard(item))}
                        </div>
                    </div>
                )}
                {dashboardFilteredData.length === 0 && (
                    <div className="no-results-container">
                        <p className="no-results">No se encontraron resultados para "{searchTerm}"</p>
                    </div>
                )}
            </div>
        );
    };

    const renderDashboardCard = (item) => (
        <a
            key={item.name}
            href={encodeUrl(item.name)}
            target="_blank"
            rel="noopener noreferrer"
            className={`indicator-card-integ ${item.type}`}
        >
            <div className="card-icon-wrapper-integ">
                {item.type === 'folder' ? <Folder size={24} /> : <FileSpreadsheet size={24} />}
            </div>
            <div className="card-info-integ">
                <span className="card-name-integ" title={item.name}>{item.name}</span>
                <span className="card-action-integ">
                    <ExternalLink size={12} /> Abrir {item.type === 'folder' ? 'Carpeta' : 'Excel'}
                </span>
            </div>
        </a>
    );

    // Group items by category and filter by search term
    const groupedFilteredData = useMemo(() => {
        if (!selectedYear) return [];

        const lowerSearch = searchTerm.toLowerCase();

        return INDICATOR_GROUPS.map(group => {
            const filteredItems = group.items.filter(item =>
                item.toLowerCase().includes(lowerSearch) ||
                group.title.toLowerCase().includes(lowerSearch)
            );

            return {
                ...group,
                items: filteredItems
            };
        }).filter(group => group.items.length > 0);
    }, [selectedYear, searchTerm]);

    if (selectedYear) {
        return (
            <div className="indicators-page detail-view">
                <header className="page-header detail-header">
                    <button onClick={handleBack} className="btn-back">
                        <ArrowLeft size={20} /> Volver
                    </button>
                    <h1>Indicadores {selectedYear.year}</h1>
                </header>

                <div className="indicators-controls">
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Buscar indicador, proceso o estadística..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {selectedYear.year === 2025 ? (
                    <div className="dashboard-2025-integration">
                        {renderDashboardContent()}
                    </div>
                ) : (
                    <div className="indicators-groups-container">
                        {groupedFilteredData.length > 0 ? (
                            groupedFilteredData.map((group, groupIdx) => (
                                <div key={groupIdx} className="indicator-group-section">
                                    <h2 className="group-title">
                                        <span className={`badge ${group.type === 'Proceso' ? 'badge-process' : 'badge-inst'}`}>
                                            {group.type}
                                        </span>
                                        {group.title}
                                    </h2>
                                    <div className="indicators-table-container">
                                        <table className="indicators-table">
                                            <thead>
                                                <tr>
                                                    <th>Nombre del Indicador / Documento</th>
                                                    <th>Acción</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {group.items.map((item, itemIdx) => (
                                                    <tr key={itemIdx}>
                                                        <td className="col-name">{item}</td>
                                                        <td className="col-action">
                                                            <Link
                                                                to={`/documental?q=${item} ${selectedYear.year}`}
                                                                className="btn-open"
                                                            >
                                                                <ExternalLink size={16} /> Abrir
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results-container">
                                <p className="no-results">
                                    No se encontraron resultados para "{searchTerm}"
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="indicators-page">
            <header className="page-header">
                <h1>Indicadores y Estadísticas</h1>
                <p>Consulte la gestión, planes y reportes estadísticos de la institución por vigencia.</p>
            </header>

            <section className="indicators-year-grid">
                {YEARS.map((item, index) => (
                    <div
                        key={index}
                        className={`year-card ${index === 0 ? 'current-year' : ''}`}
                        onClick={() => handleYearClick(item)}
                    >
                        <div className="card-icon">
                            {index === 0 ? <Calendar size={32} /> : <Folder size={28} />}
                        </div>
                        <div className="card-content">
                            <h2>{item.year}</h2>
                            <span className="card-action">Ver listado &rarr;</span>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default IndicatorsPage;
