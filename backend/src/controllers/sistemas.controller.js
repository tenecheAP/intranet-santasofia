const { Pool } = require('pg');
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'db',
    database: process.env.DB_NAME || 'intranet_db',
    password: process.env.DB_PASSWORD || 'postgres',
    port: process.env.DB_PORT || 5432,
});

const getSistemas = async (req, res) => {
    try {
        const response = await pool.query('SELECT * FROM sistemas ORDER BY orden ASC, id DESC');
        res.json(response.rows);
    } catch (error) {
        console.error('Error fetching sistemas:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createSistema = async (req, res) => {
    const { nombre, descripcion, url, interno, orden } = req.body;
    try {
        const response = await pool.query(
            'INSERT INTO sistemas (nombre, descripcion, url, interno, orden) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, url, interno || false, orden || 0]
        );
        res.status(201).json(response.rows[0]);
    } catch (error) {
        console.error('Error creating sistema:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateSistema = async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, url, interno, orden, activo } = req.body;
    try {
        const response = await pool.query(
            'UPDATE sistemas SET nombre = $1, descripcion = $2, url = $3, interno = $4, orden = $5, activo = $6 WHERE id = $7 RETURNING *',
            [nombre, descripcion, url, interno, orden, activo, id]
        );
        res.json(response.rows[0]);
    } catch (error) {
        console.error('Error updating sistema:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteSistema = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM sistemas WHERE id = $1', [id]);
        res.json({ message: `Sistema ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting sistema:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getSistemas,
    createSistema,
    updateSistema,
    deleteSistema
};
