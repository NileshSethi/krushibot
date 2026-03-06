const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Load .env.local manually (dotenv v17 auto-injects but can conflict)
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '..', '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

async function initDB() {
    console.log('Connecting to MySQL...');
    const connection = await mysql.createConnection({
        host: envConfig.DB_HOST || 'localhost',
        user: envConfig.DB_USER || 'root',
        password: envConfig.DB_PASSWORD || '',
        multipleStatements: true
    });

    console.log('Connected.');

    try {
        const schemaPath = path.join(__dirname, '..', 'schema.SQL');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing schema to create tables...');
        await connection.query(schemaSql);
        console.log('Database initialized successfully!');
        console.log('Test User: OP-1001 / securePassword123');

    } catch (err) {
        console.error('Error executing schema:', err);
    } finally {
        await connection.end();
    }
}

initDB();