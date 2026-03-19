// ============================================================
// LIST OPERATORS SCRIPT
// ============================================================
// Usage: node scripts/list-operators.js
//
// This script lists all registered operators (users) currently 
// stored in the MySQL database.
// ============================================================

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env variables
const envPath = path.join(__dirname, '..', '.env.local');
let envConfig = {};

try {
  if (fs.existsSync(envPath)) {
    envConfig = dotenv.parse(fs.readFileSync(envPath));
  } else {
    require('dotenv').config();
    envConfig = process.env;
  }
} catch (err) {
  console.log('Warning: Could not load .env file. Falling back to defaults.');
}

async function listOperators() {
  try {
    const connection = await mysql.createConnection({
      host: envConfig.DB_HOST || 'localhost',
      user: envConfig.DB_USER || 'root',
      password: envConfig.DB_PASSWORD || '',
      database: envConfig.DB_NAME || 'secure_auth_db'
    });

    console.log('\nFetching registered operators from database...\n');

    // Fetch operators without exposing password hashes
    const [rows] = await connection.execute(
      'SELECT id, operator_id, email, created_at FROM operators ORDER BY id ASC'
    );

    if (rows.length === 0) {
      console.log('No operators found in the database.');
    } else {
      // Format the data for a cleaner table display
      const formattedRows = rows.map(row => ({
        ID: row.id,
        'Operator ID': row.operator_id,
        Email: row.email,
        'Created At': new Date(row.created_at).toLocaleString()
      }));
      
      console.table(formattedRows);
    }

    console.log(`\nTotal registered operators: ${rows.length}\n`);

    await connection.end();
  } catch (error) {
    if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('\nError: The "operators" table does not exist. Please initialize the database first.\n');
    } else {
      console.error('\nError fetching operators:', error.message, '\n');
    }
    process.exit(1);
  }
}

listOperators();
