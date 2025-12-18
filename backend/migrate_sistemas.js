const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'user_intranet',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'intranet_db',
    password: process.env.DB_PASSWORD || 'strong_password',
    port: process.env.DB_PORT || 5432,
});

async function migrate() {
    try {
        console.log('Connecting to database...');
        const client = await pool.connect();

        console.log('Reading migration SQL...');
        const sql = `
        CREATE TABLE IF NOT EXISTS sistemas (
            id SERIAL PRIMARY KEY,
            nombre VARCHAR(200) NOT NULL,
            descripcion TEXT,
            url VARCHAR(500) NOT NULL,
            interno BOOLEAN DEFAULT FALSE,
            orden INTEGER DEFAULT 0,
            activo BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`;

        console.log('Executing migration...');
        await client.query(sql);
        console.log('Migration successful: "sistemas" table created.');

        client.release();
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
