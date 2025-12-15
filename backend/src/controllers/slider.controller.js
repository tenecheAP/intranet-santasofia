const pool = require('../db/pool');

const getAll = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM anuncios ORDER BY orden ASC, created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los anuncios' });
    }
};

const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM anuncios WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Anuncio no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el anuncio' });
    }
};

const create = async (req, res) => {
    console.log('Create slider request body:', req.body);
    console.log('Create slider request file:', req.file);

    const { titulo, link, es_interno, contenido, resumen, orden, activo } = req.body;
    let imagen_url = '';

    if (req.file) {
        imagen_url = `/uploads/sliders/${req.file.filename}`;
    } else {
        console.error('No file received');
        return res.status(400).json({ error: 'La imagen es requerida' });
    }

    try {
        const query = `INSERT INTO anuncios (titulo, imagen_url, link, es_interno, contenido, resumen, orden, activo) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

        // Parse values safely
        const ordenVal = parseInt(orden, 10);
        const values = [
            titulo,
            imagen_url,
            link || '',
            es_interno === 'true',
            contenido || '',
            resumen || '',
            isNaN(ordenVal) ? 0 : ordenVal,
            activo === 'true'
        ];

        console.log('Executing query:', query);
        console.log('With values:', values);

        const result = await pool.query(query, values);
        console.log('Query result:', result.rows[0]);
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error creating slider:', error);
        res.status(500).json({ error: 'Error al crear el anuncio', details: error.message });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    console.log('Update slider request body:', req.body);
    console.log('Update slider request file:', req.file);
    const { titulo, link, es_interno, contenido, resumen, orden, activo } = req.body;

    try {
        // First get existing add to know if we need to keep old image or delete it (deletion not implemented for simplicity, just overwrite ref)
        const current = await pool.query('SELECT * FROM anuncios WHERE id = $1', [id]);
        if (current.rows.length === 0) {
            return res.status(404).json({ error: 'Anuncio no encontrado' });
        }

        let imagen_url = current.rows[0].imagen_url;
        if (req.file) {
            imagen_url = `/uploads/sliders/${req.file.filename}`;
        }

        const values = [
            titulo,
            imagen_url,
            link,
            es_interno === 'true',
            contenido,
            resumen,
            orden,
            activo === 'true',
            id
        ];
        console.log('Update query values:', values);

        const result = await pool.query(
            `UPDATE anuncios SET titulo = $1, imagen_url = $2, link = $3, es_interno = $4, contenido = $5, resumen = $6, orden = $7, activo = $8 
             WHERE id = $9 RETURNING *`,
            values
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el anuncio' });
    }
};

const remove = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM anuncios WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Anuncio no encontrado' });
        }
        res.json({ message: 'Anuncio eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el anuncio' });
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};
