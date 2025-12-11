const pool = require('../db/pool');

const getAllNews = async (req, res) => {
    try {
        console.log('Fetching all news...'); // Added logging
        const result = await pool.query('SELECT * FROM noticias ORDER BY fecha_publicacion DESC, created_at DESC');
        console.log(`Found ${result.rows.length} news items.`); // Added logging
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

const getNewsById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM noticias WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createNews = async (req, res) => {
    const { titulo, contenido, imagen_url, fecha_publicacion, autor } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO noticias (titulo, contenido, imagen_url, fecha_publicacion, autor) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, contenido, imagen_url, fecha_publicacion || new Date(), autor]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateNews = async (req, res) => {
    const { id } = req.params;
    const { titulo, contenido, imagen_url, fecha_publicacion, autor } = req.body;
    try {
        const result = await pool.query(
            'UPDATE noticias SET titulo = $1, contenido = $2, imagen_url = $3, fecha_publicacion = $4, autor = $5 WHERE id = $6 RETURNING *',
            [titulo, contenido, imagen_url, fecha_publicacion, autor, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const deleteNews = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM noticias WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'News not found' });
        }
        res.json({ message: 'News deleted successfully' });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getAllNews,
    getNewsById,
    createNews,
    updateNews,
    deleteNews
};
