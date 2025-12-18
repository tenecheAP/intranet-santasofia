import React, { useState, useMemo } from 'react';
import { FileText, Folder, Calendar, ArrowLeft, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
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

const INDICATOR_GROUPS = [
    {
        title: 'ESTADÍSTICAS E INDICADORES INSTITUCIONALES',
        type: 'Institucional',
        items: ['Ejemplo de Indicador o Documento']
    },
    {
        title: 'INDICADORES POR PROCESOS',
        type: 'Proceso',
        items: ['Ejemplo de Indicador por Proceso']
    }
];

const IndicatorsPage = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleYearClick = (yearItem) => {
        setSelectedYear(yearItem);
        setSearchTerm('');
        window.scrollTo(0, 0);
    };

    const handleBack = () => {
        setSelectedYear(null);
    };

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
