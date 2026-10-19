import client from './client';

export const getDirectory = async () => {
    const response = await client.get('/directory');
    return response.data;
};

export const createExtension = async (data) => {
    const response = await client.post('/directory', data);
    return response.data;
};

export const updateExtension = async (id, data) => {
    const response = await client.put(`/directory/${id}`, data);
    return response.data;
};

export const deleteExtension = async (id) => {
    const response = await client.delete(`/directory/${id}`);
    return response.data;
};
