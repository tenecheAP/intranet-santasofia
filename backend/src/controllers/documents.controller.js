const pool = require('../db/pool');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM documentos ORDER BY fecha DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los documentos' });
    }
};

const create = async (req, res) => {
    const { titulo, categoria, tipo, fecha } = req.body;
    let url = req.body.url || '';

    if (req.file) {
        url = `/uploads/documents/${req.file.filename}`;
    }
    try {
        const result = await pool.query(
            'INSERT INTO documentos (titulo, categoria, tipo, fecha, url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [titulo, categoria, tipo, fecha, url]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el documento' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { titulo, categoria, tipo, fecha } = req.body;
    let url = req.body.url;

    if (req.file) {
        url = `/uploads/documents/${req.file.filename}`;
    }
    try {
        const result = await pool.query(
            'UPDATE documentos SET titulo = $1, categoria = $2, tipo = $3, fecha = $4, url = $5 WHERE id = $6 RETURNING *',
            [titulo, categoria, tipo, fecha, url, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el documento' });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM documentos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Documento no encontrado' });
        }
        res.json({ message: 'Documento eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el documento' });
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
