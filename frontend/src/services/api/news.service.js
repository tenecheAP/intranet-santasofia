import client from './client';

const getNews = async () => {
    try {
        const response = await client.get('/news');
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

const getNewsById = async (id) => {
    try {
        const response = await client.get(`/news/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

const createNews = async (news) => {
    try {
        const response = await client.post('/news', news);
        return response.data;
    } catch (error) {
        console.error('Error creating news:', error);
        throw error;
    }
};

const updateNews = async (id, news) => {
    try {
        const response = await client.put(`/news/${id}`, news);
        return response.data;
    } catch (error) {
        console.error('Error updating news:', error);
        throw error;
    }
};

const deleteNews = async (id) => {
    try {
        const response = await client.delete(`/news/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting news:', error);
        throw error;
    }
};

export default {
    getNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
