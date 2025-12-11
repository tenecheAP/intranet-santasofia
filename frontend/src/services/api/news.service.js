const getNews = async () => {
    try {
        const response = await fetch('/news');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

const getNewsById = async (id) => {
    try {
        const response = await fetch(`/news/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        throw error;
    }
};

const createNews = async (news) => {
    try {
        const response = await fetch('/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(news),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating news:', error);
        throw error;
    }
};

const updateNews = async (id, news) => {
    try {
        const response = await fetch(`/news/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(news),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating news:', error);
        throw error;
    }
};

const deleteNews = async (id) => {
    try {
        const response = await fetch(`/news/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
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
