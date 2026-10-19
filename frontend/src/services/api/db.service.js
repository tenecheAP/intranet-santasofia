import client from './client';

export const downloadBackup = async () => {
    try {
        // We use window.location.href or a direct link for downloads to handle binary stream properly
        const API_URL = process.env.REACT_APP_API_URL || '';
        window.open(`${API_URL}/db/backup`, '_blank');
    } catch (error) {
        console.error('Error downloading backup:', error);
        throw error;
    }
};

export const restoreBackup = async (file) => {
    const formData = new FormData();
    formData.append('backup', file);

    const response = await client.post('/db/restore', formData);
    return response.data;
};
