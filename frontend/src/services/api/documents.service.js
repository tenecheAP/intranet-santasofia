import client from './client';

export const getDocuments = async () => {
    const response = await client.get('/documents');
    return response.data;
};

export const createDocument = async (data) => {
    const response = await client.post('/documents', data);
    return response.data;
};

export const updateDocument = async (id, data) => {
    const response = await client.put(`/documents/${id}`, data);
    return response.data;
};

export const deleteDocument = async (id) => {
    const response = await client.delete(`/documents/${id}`);
    return response.data;
};
