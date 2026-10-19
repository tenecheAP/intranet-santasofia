import client from './client';

export const getCategories = async () => {
    const response = await client.get('/categories');
    return response.data;
};

export const createCategory = async (nombre) => {
    const response = await client.post('/categories', { nombre });
    return response.data;
};

export const updateCategory = async (id, nombre) => {
    const response = await client.put(`/categories/${id}`, { nombre });
    return response.data;
};

export const deleteCategory = async (id) => {
    const response = await client.delete(`/categories/${id}`);
    return response.data;
};
