const pool = require('../db/pool');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM categorias_documentos ORDER BY nombre ASC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

const create = async (req, res) => {
    const { nombre } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO categorias_documentos (nombre) VALUES ($1) RETURNING *',
            [nombre]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        if (error.code === '23505') {
            return res.status(400).json({ error: 'La categoría ya existe' });
        }
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        // En un escenario real, si se cambia el nombre de la categoría, 
        // probablemente querríamos actualizar los documentos asociados si se guardan por nombre.
        // En este esquema, los documentos guardan la categoría como STRING.

        // Primero obtenemos el nombre antiguo
        const oldCatResult = await pool.query('SELECT nombre FROM categorias_documentos WHERE id = $1', [id]);
        if (oldCatResult.rows.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        const oldNombre = oldCatResult.rows[0].nombre;

        // Actualizamos la categoría
        const result = await pool.query(
            'UPDATE categorias_documentos SET nombre = $1 WHERE id = $2 RETURNING *',
            [nombre, id]
        );

        // Actualizamos todos los documentos que tenían ese nombre de categoría
        await pool.query('UPDATE documentos SET categoria = $1 WHERE categoria = $2', [nombre, oldNombre]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        // Obtenemos el nombre para verificar en la tabla documentos
        const catResult = await pool.query('SELECT nombre FROM categorias_documentos WHERE id = $1', [id]);
        if (catResult.rows.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        const nombre = catResult.rows[0].nombre;

        // Verificamos si hay documentos asociados
        const docsResult = await pool.query('SELECT COUNT(*) FROM documentos WHERE categoria = $1', [nombre]);
        if (parseInt(docsResult.rows[0].count) > 0) {
            return res.status(400).json({
                error: 'No se puede eliminar la categoría porque tiene documentos asociados'
            });
        }

        await pool.query('DELETE FROM categorias_documentos WHERE id = $1', [id]);
        res.json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
