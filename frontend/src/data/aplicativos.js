// src/data/aplicativos.js
// Configuración de todos los aplicativos externos de la intranet

export const aplicativos = [
    {
        id: 'actas-nacimiento',
        nombre: 'Actas nacimiento/defunción',
        descripcion: 'Sistema de registro y consulta de actas de nacimiento y defunción',
        url: '', // Agregar URL aquí
        categoria: 'Registros Civiles',
        icono: '📋',
        activo: true
    },
    {
        id: 'almera',
        nombre: 'Almera',
        descripcion: 'Sistema de gestión de almacén y recursos',
        url: '', // Agregar URL aquí
        categoria: 'Gestión',
        icono: '📦',
        activo: true
    },
    {
        id: 'gestion-conocimiento',
        nombre: 'Gestión de Conocimiento',
        descripcion: 'Plataforma de gestión del conocimiento organizacional',
        url: '', // Agregar URL aquí
        categoria: 'Gestión',
        icono: '📚',
        activo: true
    },
    {
        id: 'hosvital',
        nombre: 'Hosvital',
        descripcion: 'Sistema de información hospitalaria',
        url: '', // Agregar URL aquí
        categoria: 'Sistemas Médicos',
        icono: '🏥',
        activo: true
    },
    {
        id: 'mesa-ayuda',
        nombre: 'Mesa de Ayuda',
        descripcion: 'Sistema de tickets y soporte técnico',
        url: '', // Agregar URL aquí
        categoria: 'Soporte',
        icono: '🎫',
        activo: true
    },
    {
        id: 'normas-clinicas',
        nombre: 'Normas Clínicas',
        descripcion: 'Repositorio de normas y protocolos clínicos',
        url: '', // Agregar URL aquí
        categoria: 'Documentación',
        icono: '📖',
        activo: true
    },
    {
        id: 'ruta-acreditacion',
        nombre: 'Ruta de la Acreditación',
        descripcion: 'Seguimiento del proceso de acreditación',
        url: '', // Agregar URL aquí
        categoria: 'Calidad',
        icono: '🎯',
        activo: true
    },
    {
        id: 'seguridad-paciente',
        nombre: 'Seguridad del Paciente',
        descripcion: 'Sistema de gestión de seguridad del paciente',
        url: '', // Agregar URL aquí
        categoria: 'Calidad',
        icono: '🛡️',
        activo: true
    },
    {
        id: 'sevenet',
        nombre: 'Sevenet',
        descripcion: 'Sistema de eventos adversos',
        url: '', // Agregar URL aquí
        categoria: 'Calidad',
        icono: '⚠️',
        activo: true
    },
    {
        id: 'software-web',
        nombre: 'Software Web',
        descripcion: 'Portal de aplicaciones web institucionales',
        url: '', // Agregar URL aquí
        categoria: 'Sistemas',
        icono: '🌐',
        activo: true
    },
    {
        id: 'ssofthia-wiki',
        nombre: 'Ssofthia Wiki',
        descripcion: 'Wiki de conocimiento institucional',
        url: '', // Agregar URL aquí
        categoria: 'Documentación',
        icono: '📝',
        activo: true
    }
];

// Obtener todas las categorías únicas
export const getCategorias = () => {
    const categorias = [...new Set(aplicativos.map(app => app.categoria))];
    return categorias.sort();
};

// Obtener aplicativos por categoría
export const getAplicativosPorCategoria = (categoria) => {
    return aplicativos.filter(app => app.categoria === categoria && app.activo);
};

// Obtener todos los aplicativos activos
export const getAplicativosActivos = () => {
    return aplicativos.filter(app => app.activo);
};

// Buscar aplicativos por nombre
export const buscarAplicativos = (termino) => {
    const terminoLower = termino.toLowerCase();
    return aplicativos.filter(app =>
        app.activo && (
            app.nombre.toLowerCase().includes(terminoLower) ||
            app.descripcion.toLowerCase().includes(terminoLower)
        )
    );
};
