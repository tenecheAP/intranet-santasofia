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
        console.log('Conectando a la base de datos...');
        const client = await pool.connect();

        console.log('Creando tabla notificaciones si no existe...');
        const createTableSql = `
        CREATE TABLE IF NOT EXISTS notificaciones (
            id SERIAL PRIMARY KEY,
            titulo VARCHAR(200),
            mensaje TEXT NOT NULL,
            tipo VARCHAR(20) DEFAULT 'info',
            activa BOOLEAN DEFAULT TRUE,
            duracion INTEGER DEFAULT 5000,
            fecha_inicio TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            fecha_fin TIMESTAMP NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE INDEX IF NOT EXISTS idx_notificaciones_vigentes 
        ON notificaciones (activa, fecha_inicio, fecha_fin);
        `;
        await client.query(createTableSql);
        console.log('Tabla "notificaciones" verificada / creada exitosamente.');

        // Verificar si ya existen notificaciones
        const countRes = await client.query('SELECT COUNT(*) FROM notificaciones');
        const count = parseInt(countRes.rows[0].count, 10);

        if (count === 0) {
            console.log('Insertando notificaciones iniciales...');
            const seedSql = `
            INSERT INTO notificaciones (titulo, mensaje, tipo, activa, duracion, fecha_inicio, fecha_fin) VALUES
            ('Bienvenida', '¡Bienvenido a la nueva Intranet de Santa Sofía!', 'success', true, 8000, '2025-01-01 00:00:00', '2026-12-31 23:59:59'),
            ('Mantenimiento', 'Mantenimiento programado: El próximo domingo a las 02:00 AM se realizarán ajustes en el servidor.', 'warning', true, 0, '2025-04-07 00:00:00', '2026-12-31 23:59:59');
            `;
            await client.query(seedSql);
            console.log('Notificaciones iniciales insertadas correctamente.');
        } else {
            console.log(`La tabla ya contiene ${count} notificaciones. No se insertaron duplicados.`);
        }

        client.release();
        console.log('Migración de notificaciones completada con éxito.');
        process.exit(0);
    } catch (err) {
        console.error('Error durante la migración de notificaciones:', err);
        process.exit(1);
    }
}

migrate();

