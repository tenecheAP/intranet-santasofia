const pool = require('../db/pool');

/**
 * Obtener todas las notificaciones (Para el panel de administración)
 */
const getAllNotifications = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM notificaciones ORDER BY created_at DESC, id DESC');
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching all notifications:', error);
        res.status(500).json({ error: 'Error al obtener las notificaciones' });
    }
};

/**
 * Obtener únicamente las notificaciones activas y vigentes (Para el portal / Home)
 */
const getActiveNotifications = async (req, res) => {
    try {
        const query = `
            SELECT id, titulo, mensaje, tipo, activa, duracion, fecha_inicio, fecha_fin
            FROM notificaciones
            WHERE activa = true 
              AND CURRENT_TIMESTAMP BETWEEN fecha_inicio AND fecha_fin
            ORDER BY fecha_inicio ASC, id DESC
        `;
        const response = await pool.query(query);
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching active notifications:', error);
        res.status(500).json({ error: 'Error al obtener notificaciones activas' });
    }
};

/**
 * Crear una nueva notificación
 */
const createNotification = async (req, res) => {
    const { titulo, mensaje, tipo, activa, duracion, fecha_inicio, fecha_fin } = req.body;

    if (!mensaje || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Mensaje, fecha de inicio y fecha de fin son requeridos.' });
    }

    try {
        const query = `
            INSERT INTO notificaciones (titulo, mensaje, tipo, activa, duracion, fecha_inicio, fecha_fin)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;
        const values = [
            titulo || 'Aviso Institucional',
            mensaje,
            tipo || 'info',
            activa !== undefined ? activa : true,
            duracion !== undefined ? parseInt(duracion, 10) : 5000,
            fecha_inicio,
            fecha_fin
        ];

        const response = await pool.query(query, values);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ error: 'Error al crear la notificación' });
    }
};

/**
 * Actualizar una notificación existente
 */
const updateNotification = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { titulo, mensaje, tipo, activa, duracion, fecha_inicio, fecha_fin } = req.body;

    if (!mensaje || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ error: 'Mensaje, fecha de inicio y fecha de fin son requeridos.' });
    }

    try {
        const query = `
            UPDATE notificaciones
            SET titulo = $1,
                mensaje = $2,
                tipo = $3,
                activa = $4,
                duracion = $5,
                fecha_inicio = $6,
                fecha_fin = $7,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $8
            RETURNING *
        `;
        const values = [
            titulo || 'Aviso Institucional',
            mensaje,
            tipo || 'info',
            activa !== undefined ? activa : true,
            duracion !== undefined ? parseInt(duracion, 10) : 5000,
            fecha_inicio,
            fecha_fin,
            id
        ];

        const response = await pool.query(query, values);
        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }
        res.json(response.rows[0]);
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({ error: 'Error al actualizar la notificación' });
    }
};

/**
 * Alternar estado activo / inactivo rápidamente
 */
const toggleNotification = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const query = `
            UPDATE notificaciones
            SET activa = NOT activa,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $1
            RETURNING *
        `;
        const response = await pool.query(query, [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }
        res.json(response.rows[0]);
    } catch (error) {
        console.error('Error toggling notification:', error);
        res.status(500).json({ error: 'Error al cambiar estado de la notificación' });
    }
};

/**
 * Eliminar una notificación
 */
const deleteNotification = async (req, res) => {
    const id = parseInt(req.params.id, 10);

    try {
        const response = await pool.query('DELETE FROM notificaciones WHERE id = $1 RETURNING id', [id]);
        if (response.rows.length === 0) {
            return res.status(404).json({ error: 'Notificación no encontrada' });
        }
        res.json({ message: `Notificación ${id} eliminada exitosamente`, id });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ error: 'Error al eliminar la notificación' });
    }
};

module.exports = {
    getAllNotifications,
    getActiveNotifications,
    createNotification,
    updateNotification,
    toggleNotification,
    deleteNotification
};

