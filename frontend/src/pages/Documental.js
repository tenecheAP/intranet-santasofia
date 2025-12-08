import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './Documental.css';

const initialDocumentData = {
    'Gestión de Calidad': [
        { id: 1, title: 'Política de Calidad Institucional', type: 'PDF', date: '2023-10-01', url: '' },
        { id: 2, title: 'Manual de Procesos y Procedimientos', type: 'PDF', date: '2023-09-15', url: '' },
        { id: 3, title: 'Mapa de Procesos 2024', type: 'IMG', date: '2023-11-20', url: '' },
    ],
    'Talento Humano': [
        { id: 4, title: 'Reglamento Interno de Trabajo', type: 'PDF', date: '2022-05-10', url: '' },
        { id: 5, title: 'Formato de Solicitud de Permisos', type: 'DOCX', date: '2023-01-20', url: '' },
        { id: 6, title: 'Cronograma de Capacitaciones 2024', type: 'XLSX', date: '2023-12-05', url: '' },
    ],
    'Jurídica': [
        { id: 7, title: 'Circular Normativa 001', type: 'PDF', date: '2024-01-15', url: '' },
        { id: 8, title: 'Resolución de Nombramientos', type: 'PDF', date: '2023-11-30', url: '' },
    ],
    'Contratación': [
        { id: 9, title: 'Manual de Contratación', type: 'PDF', date: '2023-08-10', url: '' },
        { id: 10, title: 'Formatos de Minutas', type: 'ZIP', date: '2023-08-12', url: '' },
    ]
};

function Documental() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const [docsData, setDocsData] = useState(initialDocumentData);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);

    // New Document State
    const [newDoc, setNewDoc] = useState({
        title: '',
        category: 'Gestión de Calidad',
        type: 'PDF',
        date: new Date().toISOString().split('T')[0],
        url: ''
    });

    useEffect(() => {
        const storedDocs = localStorage.getItem('documentData');
        if (storedDocs) {
            setDocsData(JSON.parse(storedDocs));
        }
    }, []);

    // Helper to map categories to folder paths
    const getFolderByCategory = (category) => {
        const normalized = category.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/ /g, "-"); // Replace spaces with dashes

        // Manual overrides for specific folders if needed, otherwise use normalized name
        const map = {
            'gestion-de-calidad': 'calidad',
            'talento-humano': 'talento-humano',
            'juridica': 'juridica',
            'contratacion': 'contratacion'
        };

        return map[normalized] || normalized;
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check if user has selected a category, if not default to 'calidad' logic or current
            const folder = getFolderByCategory(newDoc.category);

            // Construct the path
            // We keep the original filename including spaces
            const path = `/documentos/${folder}/${file.name}`;

            setNewDoc({
                ...newDoc,
                url: path,
                // Also auto-suggest title if empty
                title: newDoc.title || file.name.split('.')[0]
            });
        }
    };

    const handleAddDocument = (e) => {
        e.preventDefault();
        const category = newDoc.category;

        if (editingDoc) {
            // Editing existing document
            const updatedDocs = { ...docsData };
            const oldCategory = Object.keys(updatedDocs).find(cat =>
                updatedDocs[cat].some(doc => doc.id === editingDoc.id)
            );

            if (oldCategory === category) {
                updatedDocs[category] = updatedDocs[category].map(doc =>
                    doc.id === editingDoc.id ? { ...newDoc, id: editingDoc.id } : doc
                );
            } else {
                updatedDocs[oldCategory] = updatedDocs[oldCategory].filter(doc => doc.id !== editingDoc.id);
                if (!updatedDocs[category]) {
                    updatedDocs[category] = [];
                }
                updatedDocs[category] = [{ ...newDoc, id: editingDoc.id }, ...updatedDocs[category]];
            }

            setDocsData(updatedDocs);
            localStorage.setItem('documentData', JSON.stringify(updatedDocs));
            alert('Documento actualizado correctamente.');
        } else {
            // Adding new document
            const newId = Date.now();
            const documentToAdd = { ...newDoc, id: newId };

            const updatedDocs = { ...docsData };
            if (!updatedDocs[category]) {
                updatedDocs[category] = [];
            }
            updatedDocs[category] = [documentToAdd, ...updatedDocs[category]];

            setDocsData(updatedDocs);
            localStorage.setItem('documentData', JSON.stringify(updatedDocs));
            alert('Documento agregado correctamente.');
        }

        closeModal();
    };

    const handleEditDocument = (doc, category) => {
        setEditingDoc(doc);
        setNewDoc({
            title: doc.title,
            category: category,
            type: doc.type,
            date: doc.date,
            url: doc.url || ''
        });
        setIsUploadModalOpen(true);
    };

    const handleDeleteDocument = (docId, category) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este documento?')) {
            const updatedDocs = { ...docsData };
            updatedDocs[category] = updatedDocs[category].filter(doc => doc.id !== docId);
            setDocsData(updatedDocs);
            localStorage.setItem('documentData', JSON.stringify(updatedDocs));
            alert('Documento eliminado correctamente.');
        }
    };

    const closeModal = () => {
        setIsUploadModalOpen(false);
        setEditingDoc(null);
        setNewDoc({
            title: '',
            category: 'Gestión de Calidad',
            type: 'PDF',
            date: new Date().toISOString().split('T')[0],
            url: ''
        });
    };

    const categories = ['Todas', ...Object.keys(docsData)];
    const availableCategories = Object.keys(docsData);

    const getFilteredDocuments = () => {
        let docs = [];
        let docsByCategory = {};

        if (activeCategory === 'Todas') {
            Object.entries(docsData).forEach(([category, categoryDocs]) => {
                categoryDocs.forEach(doc => {
                    docs.push(doc);
                    docsByCategory[doc.id] = category;
                });
            });
        } else {
            docs = docsData[activeCategory] || [];
            docs.forEach(doc => {
                docsByCategory[doc.id] = activeCategory;
            });
        }

        if (searchTerm) {
            docs = docs.filter(doc =>
                doc.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return { docs, docsByCategory };
    };

    const { docs: filteredDocs, docsByCategory } = getFilteredDocuments();

    const handleDownload = (doc) => {
        if (doc.url) {
            // Encode the URL to handle spaces and special characters
            const encodedUrl = encodeURI(doc.url);
            window.open(encodedUrl, '_blank');
        } else {
            alert('Este documento no tiene un enlace configurado.');
        }
    };

    return (
        <div className="documental-page">
            <div className="documental-header">
                <h1>Gestión Documental</h1>
                <p>Consulta y descarga los documentos institucionales.</p>

                {user && user.role === 'admin' && (
                    <button className="add-doc-btn" onClick={() => setIsUploadModalOpen(true)}>
                        <i className="fas fa-plus-circle"></i> Agregar Documento
                    </button>
                )}

                <div className="doc-search-container">
                    <input
                        type="text"
                        placeholder="Buscar documento por nombre..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="doc-search-input"
                    />
                    <button className="doc-search-btn">
                        <i className="fas fa-search"></i>
                    </button>
                </div>
            </div>

            {/* Upload Modal */}
            {isUploadModalOpen && (
                <div className="modal-overlay">
                    <div className="upload-modal">
                        <button className="close-btn" onClick={closeModal}>&times;</button>
                        <h2>{editingDoc ? 'Editar Documento' : 'Agregar Nuevo Documento'}</h2>
                        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                            {editingDoc ? 'Modifica los datos del documento' : 'Completa todos los campos para agregar un nuevo documento'}
                        </p>
                        <form onSubmit={handleAddDocument} noValidate>
                            <div className="form-group">
                                <label>Categoría *</label>
                                <select
                                    value={newDoc.category}
                                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                                >
                                    {availableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Título del Documento *</label>
                                <input
                                    type="text"
                                    required
                                    value={newDoc.title}
                                    onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                                    placeholder="Ej: Manual de Procedimientos 2024"
                                />
                            </div>

                            <div className="form-group">
                                <label>URL o Path del Documento</label>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <input
                                        id="docUrl"
                                        type="text"
                                        value={newDoc.url}
                                        onChange={(e) => setNewDoc({ ...newDoc, url: e.target.value })}
                                        placeholder="/documentos/calidad/archivo.pdf"
                                        style={{ flex: 1 }}
                                    />
                                    <label className="file-upload-btn" style={{
                                        padding: '0.5rem 1rem',
                                        background: '#e9ecef',
                                        border: '1px solid #ced4da',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontSize: '0.9rem',
                                        marginBottom: 0
                                    }}>
                                        <i className="fas fa-folder-open" style={{ marginRight: '5px' }}></i> Explorar
                                        <input
                                            type="file"
                                            onChange={handleFileSelect}
                                            style={{ display: 'none' }}
                                        />
                                    </label>
                                </div>
                                <small style={{ color: '#666', fontSize: '0.85rem' }}>
                                    Selecciona un archivo para autocompletar la ruta (asegúrate de que el archivo esté en la carpeta correcta).
                                </small>
                            </div>

                            <div className="form-group">
                                <label>Tipo de Archivo *</label>
                                <select
                                    value={newDoc.type}
                                    onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                                >
                                    <option value="PDF">PDF</option>
                                    <option value="DOCX">Word (DOCX)</option>
                                    <option value="XLSX">Excel (XLSX)</option>
                                    <option value="IMG">Imagen</option>
                                    <option value="ZIP">ZIP</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={closeModal}>
                                    Cancelar
                                </button>
                                <button type="submit" className="submit-btn">
                                    {editingDoc ? 'Actualizar' : 'Guardar'} Documento
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="documental-content">
                <aside className="doc-categories">
                    <h3>Secciones</h3>
                    <ul>
                        {categories.map(cat => (
                            <li key={cat}>
                                <button
                                    className={activeCategory === cat ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat)}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </aside>

                <section className="doc-results">
                    <div className="results-header">
                        <h2>{activeCategory === 'Todas' ? 'Todos los Documentos' : activeCategory}</h2>
                        <span className="count">{filteredDocs.length} documentos encontrados</span>
                    </div>

                    <div className="doc-grid">
                        {filteredDocs.map(doc => (
                            <div
                                key={doc.id}
                                className="doc-card"
                                onClick={() => handleDownload(doc)}
                                style={{ cursor: 'pointer' }}
                                title="Clic para visualizar"
                            >
                                {user && user.role === 'admin' && (
                                    <div className="doc-card-actions">
                                        <button
                                            className="doc-edit-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEditDocument(doc, docsByCategory[doc.id]);
                                            }}
                                            title="Editar documento"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="doc-delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteDocument(doc.id, docsByCategory[doc.id]);
                                            }}
                                            title="Eliminar documento"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                )}
                                <div className={`doc-icon type-${doc.type.toLowerCase()}`}>
                                    <i className={`fas ${doc.type === 'IMG' ? 'fa-image' : 'fa-file-alt'}`}></i>
                                    <span className="doc-type">{doc.type}</span>
                                </div>
                                <div className="doc-info">
                                    <h4>{doc.title}</h4>
                                    <span className="doc-date"><i className="far fa-calendar-alt"></i> {doc.date}</span>
                                </div>
                                <button
                                    className="doc-download-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload(doc);
                                    }}
                                    title="Descargar"
                                >
                                    <i className="fas fa-download"></i>
                                </button>
                            </div>
                        ))}
                        {filteredDocs.length === 0 && (
                            <div className="no-results">
                                <p>No se encontraron documentos que coincidan con tu búsqueda.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Documental;
