import React, { useState, useMemo } from 'react';
import { Search, Phone, Copy, Check } from 'lucide-react';
import { directorioData } from '../data/directorioData';
import './Directorio.css';

function Directorio() {
    const [directoryData] = useState(directorioData);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedExt, setCopiedExt] = useState(null);

    const filteredData = useMemo(() => {
        return directoryData.filter(item =>
            item.departamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.extension.includes(searchTerm)
        );
    }, [searchTerm, directoryData]);

    const handleCopy = (ext) => {
        navigator.clipboard.writeText(ext);
        setCopiedExt(ext);
        setTimeout(() => setCopiedExt(null), 2000);
    };

    return (
        <div className="directorio-page generic-page">
            <div className="directorio-container">
                <header className="directorio-header">
                    <h1>Directorio Telefónico</h1>
                    <p>Encuentra rápidamente la extensión que necesitas</p>

                    <div className="search-container">
                        <div className="search-input-wrapper">
                            <Search className="search-icon" size={20} />
                            <input
                                type="text"
                                placeholder="Buscar por departamento o extensión..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                    </div>
                </header>

                <div className="directorio-grid">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div key={item.id} className="dept-card">
                                <div className="card-content" onClick={() => handleCopy(item.extension)}>
                                    <div className="dept-info">
                                        <h3 className="dept-name">{item.departamento}</h3>
                                    </div>
                                    <div className="ext-container">
                                        <div className="ext-wrapper">
                                            <span className="ext-label">Extensión</span>
                                            <div className="flex items-center gap-2">
                                                <span className="ext-number">{item.extension}</span>
                                                {copiedExt === item.extension ? (
                                                    <Check size={16} className="text-green-500" />
                                                ) : (
                                                    <Copy size={16} className="text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                        <div className="copy-hint">
                                            {copiedExt === item.extension ? '¡Copiado!' : 'Clic para copiar'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <Phone size={48} style={{ margin: '0 auto', opacity: 0.2 }} />
                            <p>No se encontraron resultados para "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Directorio;
