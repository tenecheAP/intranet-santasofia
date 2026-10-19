import client from './client';

const getSistemas = async () => {
    try {
        const response = await client.get('/sistemas');
        return response.data;
    } catch (error) {
        console.error('Error fetching sistemas:', error);
        throw error;
    }
};

const createSistema = async (data) => {
    try {
        const response = await client.post('/sistemas', data);
        return response.data;
    } catch (error) {
        console.error('Error creating sistema:', error);
        throw error;
    }
};

const updateSistema = async (id, data) => {
    try {
        const response = await client.put(`/sistemas/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error updating sistema:', error);
        throw error;
    }
};

const deleteSistema = async (id) => {
    try {
        const response = await client.delete(`/sistemas/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting sistema:', error);
        throw error;
    }
};

export default {
    getSistemas,
    createSistema,
    updateSistema,
    deleteSistema
};
