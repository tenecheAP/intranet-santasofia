import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as documentsService from '../services/api/documents.service';
import * as categoriesService from '../services/api/categories.service';
import './Documental.css';

function Documental() {
    const { user } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Todas');
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [editingDoc, setEditingDoc] = useState(null);
    const [categories, setCategories] = useState([]);

    // New Document State
    const [newDoc, setNewDoc] = useState({
        titulo: '',
        categoria: 'Gestión de Calidad',
        tipo: 'PDF',
        fecha: new Date().toISOString().split('T')[0],
        url: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        loadDocuments();
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const data = await categoriesService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    };

    const loadDocuments = async () => {
        try {
            setLoading(true);
            const data = await documentsService.getDocuments();
            setDocuments(data);
            setError(null);
        } catch (err) {
            console.error('Error loading documents:', err);
            setError('Error al cargar los documentos');
        } finally {
            setLoading(false);
        }
    };

    // Helper to map categories to folder paths
    const getFolderByCategory = (category) => {
        const normalized = category.toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/ /g, "-"); // Replace spaces with dashes

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
            setSelectedFile(file);
            // Ya no simulamos la URL falsa aquí. Dejamos que el backend la genere.
            setNewDoc({
                ...newDoc,
                titulo: newDoc.titulo || file.name.split('.')[0]
            });
        }
    };

    const handleAddDocument = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('titulo', newDoc.titulo);
            formData.append('categoria', newDoc.categoria);
            formData.append('tipo', newDoc.tipo);
            formData.append('fecha', newDoc.fecha);

            // Si el usuario seleccionó un archivo, lo enviamos
            if (selectedFile) {
                formData.append('archivo', selectedFile);
            } else if (newDoc.url) {
                // Si es edición y no cambiaron el archivo, mantenemos la URL existente (o si pegan una externa)
                formData.append('url', newDoc.url);
            }

            if (editingDoc) {
                await documentsService.updateDocument(editingDoc.id, formData);
                alert('Documento actualizado correctamente.');
            } else {
                await documentsService.createDocument(formData);
                alert('Documento agregado correctamente.');
            }
            loadDocuments();
            closeModal();
        } catch (err) {
            console.error('Error saving document:', err);
            alert('Error al guardar el documento');
        }
    };

    const handleEditDocument = (doc) => {
        setEditingDoc(doc);
        setNewDoc({
            titulo: doc.titulo,
            categoria: doc.categoria,
            tipo: doc.tipo,
            fecha: doc.fecha,
            url: doc.url || ''
        });
        setSelectedFile(null); // Resetear archivo seleccionado al editar
        setIsUploadModalOpen(true);
    };

    const handleDeleteDocument = async (docId) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este documento?')) {
            try {
                await documentsService.deleteDocument(docId);
                alert('Documento eliminado correctamente.');
                loadDocuments();
            } catch (err) {
                console.error('Error deleting document:', err);
                alert('Error al eliminar el documento');
            }
        }
    };

    const closeModal = () => {
        setIsUploadModalOpen(false);
        setEditingDoc(null);
        setNewDoc({
            titulo: '',
            categoria: 'Gestión de Calidad',
            tipo: 'PDF',
            fecha: new Date().toISOString().split('T')[0],
            url: ''
        });
    };

    const handleAddCategory = async () => {
        const nombre = prompt('Ingrese el nombre de la nueva categoría:');
        if (nombre && nombre.trim()) {
            try {
                await categoriesService.createCategory(nombre.trim());
                alert('Categoría creada correctamente.');
                loadCategories();
            } catch (err) {
                console.error('Error creating category:', err);
                alert(err.message || 'Error al crear la categoría');
            }
        }
    };

    const handleEditCategory = async (cat) => {
        const nuevoNombre = prompt('Editar nombre de la categoría:', cat.nombre);
        if (nuevoNombre && nuevoNombre.trim() && nuevoNombre.trim() !== cat.nombre) {
            try {
                await categoriesService.updateCategory(cat.id, nuevoNombre.trim());
                alert('Categoría actualizada correctamente.');
                loadCategories();
                loadDocuments(); // Reload docs because cat name might have changed in them
                if (activeCategory === cat.nombre) {
                    setActiveCategory(nuevoNombre.trim());
                }
            } catch (err) {
                console.error('Error updating category:', err);
                alert('Error al actualizar la categoría');
            }
        }
    };

    const handleDeleteCategory = async (cat) => {
        if (window.confirm(`¿Estás seguro de que deseas eliminar la categoría "${cat.nombre}"?`)) {
            try {
                await categoriesService.deleteCategory(cat.id);
                alert('Categoría eliminada correctamente.');
                loadCategories();
                if (activeCategory === cat.nombre) {
                    setActiveCategory('Todas');
                }
            } catch (err) {
                console.error('Error deleting category:', err);
                alert(err.message || 'Error al eliminar la categoría. Asegúrate de que no tenga documentos asociados.');
            }
        }
    };

    // Get unique category names for sidebar and select
    const categoryNames = ['Todas', ...categories.map(c => c.nombre)];
    const availableCategoryNames = categories.map(c => c.nombre);

    const getFilteredDocuments = () => {
        let filteredDocs = documents;

        if (activeCategory !== 'Todas') {
            filteredDocs = filteredDocs.filter(doc => doc.categoria === activeCategory);
        }

        if (searchTerm) {
            filteredDocs = filteredDocs.filter(doc =>
                doc.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return filteredDocs;
    };

    const filteredDocs = getFilteredDocuments();

    const handleDownload = (doc) => {
        if (doc.url) {
            let downloadUrl = doc.url;
            // Si la URL es relativa y empieza por /uploads (generada por nuestro backend),
            // le añadimos el dominio de la API si estamos en desarrollo para que funcione el link directo.
            // Aunque el proxy debería manejarlo, a veces window.open ignora el proxy local.
            if (doc.url.startsWith('/uploads')) {
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
                downloadUrl = `${API_URL}${doc.url}`;
            } else if (doc.url.startsWith('/documentos/')) {
                // Manejo de legados: si empieza por /documentos/ (carpeta public), usar el dominio del frontend
                // No hacemos nada, es relativo al frontend
            }

            window.open(downloadUrl, '_blank');
        } else {
            alert('Este documento no tiene un enlace configurado.');
        }
    };

    if (loading) return <div className="loading-state">Cargando documentos...</div>;

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

            {error && <div className="error-message">{error}</div>}

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
                                    value={newDoc.categoria}
                                    onChange={(e) => setNewDoc({ ...newDoc, categoria: e.target.value })}
                                >
                                    {availableCategoryNames.map(name => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Título del Documento *</label>
                                <input
                                    type="text"
                                    required
                                    value={newDoc.titulo}
                                    onChange={(e) => setNewDoc({ ...newDoc, titulo: e.target.value })}
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
                                    value={newDoc.tipo}
                                    onChange={(e) => setNewDoc({ ...newDoc, tipo: e.target.value })}
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
                    <div className="side-header">
                        <h3>Secciones</h3>
                        {user && user.role === 'admin' && (
                            <button className="add-cat-btn" onClick={handleAddCategory} title="Nueva Categoría">
                                +
                            </button>
                        )}
                    </div>
                    <ul>
                        <li>
                            <button
                                className={activeCategory === 'Todas' ? 'active' : ''}
                                onClick={() => setActiveCategory('Todas')}
                            >
                                Todas
                            </button>
                        </li>
                        {categories.map(cat => (
                            <li key={cat.id} className="category-item-container">
                                <button
                                    className={activeCategory === cat.nombre ? 'active' : ''}
                                    onClick={() => setActiveCategory(cat.nombre)}
                                >
                                    {cat.nombre}
                                </button>
                                {user && user.role === 'admin' && (
                                    <div className="cat-actions">
                                        <button onClick={() => handleEditCategory(cat)} title="Editar">
                                            <i className="fas fa-pencil-alt"></i>
                                        </button>
                                        <button onClick={() => handleDeleteCategory(cat)} title="Eliminar">
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                    </div>
                                )}
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
                                                handleEditDocument(doc);
                                            }}
                                            title="Editar documento"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            className="doc-delete-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteDocument(doc.id);
                                            }}
                                            title="Eliminar documento"
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                )}
                                <div className={`doc-icon type-${doc.tipo.toLowerCase()}`}>
                                    <i className={`fas ${doc.tipo === 'IMG' ? 'fa-image' : 'fa-file-alt'}`}></i>
                                    <span className="doc-type">{doc.tipo}</span>
                                </div>
                                <div className="doc-info">
                                    <h4>{doc.titulo}</h4>
                                    <span className="doc-date"><i className="far fa-calendar-alt"></i> {doc.fecha}</span>
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
