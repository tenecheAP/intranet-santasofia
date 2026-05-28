// frontend/src/data/notificationsData.js
// Configuración de avisos globales de la Intranet con programación de fechas

export const notificationsData = [
    {
        id: "bienvenida-2025",
        mensaje: "¡Bienvenido a la nueva Intranet de Santa Sofía!",
        tipo: "success",
        activa: true,
        duracion: 8000,
        fecha_inicio: "2025-01-01 00:00", // Ya inicio
        fecha_fin: "2026-12-31 23:59"    // Finaliza en el futuro
    },
    {
        id: "mantenimiento-domingo",
        mensaje: "Mantenimiento programado: El próximo domingo a las 02:00 AM se realizarán ajustes en el servidor.",
        tipo: "warning",
        activa: true,
        duracion: 0,
        fecha_inicio: "2025-04-07 00:00",
        fecha_fin: "2026-04-14 23:59"
    }
];
