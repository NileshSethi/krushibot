// ============================================================
// ADD NEW OPERATOR SCRIPT
// ============================================================
// Usage: node scripts/add-operator.js
//
// This script adds a new operator to the database.
// You will be prompted for: operator_id, email, password
//
// Example:
//   node scripts/add-operator.js OP-2002 john@example.com mySecurePass123
// ============================================================

const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load env
const envPath = path.join(__dirname, '..', '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

async function addOperator() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('');
    console.log('Usage: node scripts/add-operator.js <operator_id> <email> <password>');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/add-operator.js OP-2002 john@example.com myPassword123');
    console.log('');
    process.exit(1);
  }

  const [operator_id, email, password] = args;

  try {
    const connection = await mysql.createConnection({
      host: envConfig.DB_HOST || 'localhost',
      user: envConfig.DB_USER || 'root',
      password: envConfig.DB_PASSWORD || '',
      database: envConfig.DB_NAME || 'secure_auth_db'
    });

    // Hash the password with bcrypt (10 salt rounds)
    const password_hash = await bcrypt.hash(password, 10);

    // Insert new operator
    await connection.execute(
      'INSERT INTO operators (operator_id, email, password_hash, email_verified) VALUES (?, ?, ?, ?)',
      [operator_id, email, password_hash, true]
    );

    console.log('');
    console.log('Operator added successfully!');
    console.log('----------------------------');
    console.log(`  Operator ID : ${operator_id}`);
    console.log(`  Email       : ${email}`);
    console.log(`  Password    : ${password}`);
    console.log('');

    await connection.end();
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('Error: An operator with this ID or email already exists.');
    } else {
      console.error('Error adding operator:', error.message);
    }
    process.exit(1);
  }
}

addOperator();
