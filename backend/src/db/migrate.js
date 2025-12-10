const pool = require('./pool');
const fs = require('fs');
const path = require('path');

const runMigration = async () => {
    try {
        console.log('Starting migration...');

        // Read schema file
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema...');
        await pool.query(schemaSql);
        console.log('Schema executed successfully.');

        // Read seed file
        const seedlingsPath = path.join(__dirname, 'seeds.sql');
        const seedsSql = fs.readFileSync(seedlingsPath, 'utf8');

        console.log('Seeding data...');
        await pool.query(seedsSql);
        console.log('Data seeded successfully.');

        console.log('Migration completed.');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
};

runMigration();
