import React, { useState, useEffect, useMemo } from 'react';
import { Search, Phone, Copy, Check, Plus, Edit2, Trash2, X, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import * as directoryService from '../services/api/directory.service';
import './Directorio.css';

function Directorio() {
    const { user } = useAuth();
    const [directoryData, setDirectoryData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedExt, setCopiedExt] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEdit, setCurrentEdit] = useState(null);
    const [formData, setFormData] = useState({ departamento: '', extension: '' });

    useEffect(() => {
        loadDirectory();
    }, []);

    const loadDirectory = async () => {
        try {
            setLoading(true);
            const data = await directoryService.getDirectory();
            setDirectoryData(data);
            setError(null);
        } catch (err) {
            console.error('Error loading directory:', err);
            setError('Error al cargar el directorio');
        } finally {
            setLoading(false);
        }
    };

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

    const handleOpenModal = (item = null) => {
        if (item) {
            setCurrentEdit(item);
            setFormData({ departamento: item.departamento, extension: item.extension });
        } else {
            setCurrentEdit(null);
            setFormData({ departamento: '', extension: '' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (currentEdit) {
                await directoryService.updateExtension(currentEdit.id, formData);
            } else {
                await directoryService.createExtension(formData);
            }
            loadDirectory();
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error saving extension:', err);
            alert('Error al guardar la extensión');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar esta extensión?')) {
            try {
                await directoryService.deleteExtension(id);
                loadDirectory();
            } catch (err) {
                console.error('Error deleting extension:', err);
                alert('Error al eliminar la extensión');
            }
        }
    };

    if (loading) return <div className="loading-state">Cargando directorio...</div>;

    const isAdmin = user && user.role === 'admin'; // Adjust based on your AuthContext structure

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

                    {isAdmin && (
                        <button className="btn-add-extension" onClick={() => handleOpenModal()}>
                            <Plus size={20} /> Nueva Extensión
                        </button>
                    )}
                </header>

                {error && <div className="error-message">{error}</div>}

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

                                {isAdmin && (
                                    <div className="admin-actions">
                                        <button className="btn-icon edit" onClick={() => handleOpenModal(item)} title="Editar">
                                            <Edit2 size={16} />
                                        </button>
                                        <button className="btn-icon delete" onClick={() => handleDelete(item.id)} title="Eliminar">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}
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

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{currentEdit ? 'Editar Extensión' : 'Nueva Extensión'}</h2>
                            <button className="btn-close" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Departamento</label>
                                <input
                                    type="text"
                                    value={formData.departamento}
                                    onChange={(e) => setFormData({ ...formData, departamento: e.target.value })}
                                    required
                                    autoFocus
                                />
                            </div>
                            <div className="form-group">
                                <label>Extensión</label>
                                <input
                                    type="text"
                                    value={formData.extension}
                                    onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn-cancel" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                                <button type="submit" className="btn-save">
                                    <Save size={18} /> Guardar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Directorio;
