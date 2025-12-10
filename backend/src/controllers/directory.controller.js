const pool = require('../db/pool');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM directorio ORDER BY departamento ASC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el directorio' });
    }
};

const create = async (req, res) => {
    const { departamento, extension } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO directorio (departamento, extension) VALUES ($1, $2) RETURNING *',
            [departamento, extension]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la extensión' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { departamento, extension } = req.body;
    try {
        const result = await pool.query(
            'UPDATE directorio SET departamento = $1, extension = $2 WHERE id = $3 RETURNING *',
            [departamento, extension, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Extensión no encontrada' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la extensión' });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM directorio WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Extensión no encontrada' });
        }
        res.json({ message: 'Extensión eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la extensión' });
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
