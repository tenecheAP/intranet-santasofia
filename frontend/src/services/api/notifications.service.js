import client from './client';

/**
 * Obtener todas las notificaciones registradas (para administración)
 */
export const getNotifications = async () => {
    try {
        const response = await client.get('/notifications');
        return response.data;
    } catch (error) {
        console.error('Error al obtener notificaciones:', error);
        throw error;
    }
};

/**
 * Obtener solo las notificaciones activas y vigentes (para el portal/Home)
 */
export const getActiveNotifications = async () => {
    try {
        const response = await client.get('/notifications/active');
        return response.data;
    } catch (error) {
        console.error('Error al obtener notificaciones activas:', error);
        throw error;
    }
};

/**
 * Crear una nueva notificación
 */
export const createNotification = async (data) => {
    try {
        const response = await client.post('/notifications', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear notificación:', error);
        throw error;
    }
};

/**
 * Actualizar una notificación existente
 */
export const updateNotification = async (id, data) => {
    try {
        const response = await client.put(`/notifications/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar notificación:', error);
        throw error;
    }
};

/**
 * Cambiar rápidamente el estado (Activa / Inactiva)
 */
export const toggleNotification = async (id) => {
    try {
        const response = await client.patch(`/notifications/${id}/toggle`);
        return response.data;
    } catch (error) {
        console.error('Error al alternar estado de la notificación:', error);
        throw error;
    }
};

/**
 * Eliminar una notificación
 */
export const deleteNotification = async (id) => {
    try {
        const response = await client.delete(`/notifications/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar notificación:', error);
        throw error;
    }
};

const notificationsService = {
    getNotifications,
    getActiveNotifications,
    createNotification,
    updateNotification,
    toggleNotification,
    deleteNotification
};

export default notificationsService;
