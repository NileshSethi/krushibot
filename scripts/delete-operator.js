// ============================================================
// DELETE OPERATOR SCRIPT
// ============================================================
// Usage: node scripts/delete-operator.js <operator_id>
//
// Example:
//   node scripts/delete-operator.js OP-2002
// ============================================================

const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '..', '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));

async function deleteOperator() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('');
    console.log('Usage: node scripts/delete-operator.js <operator_id>');
    console.log('');
    console.log('Example:');
    console.log('  node scripts/delete-operator.js OP-2002');
    console.log('');
    process.exit(1);
  }

  const [operator_id] = args;

  try {
    const connection = await mysql.createConnection({
      host: envConfig.DB_HOST || 'localhost',
      user: envConfig.DB_USER || 'root',
      password: envConfig.DB_PASSWORD || '',
      database: envConfig.DB_NAME || 'secure_auth_db'
    });

    const [result] = await connection.execute(
      'DELETE FROM operators WHERE operator_id = ?',
      [operator_id]
    );

    if (result.affectedRows === 0) {
      console.log(`No operator found with ID: ${operator_id}`);
    } else {
      console.log(`Operator "${operator_id}" deleted successfully.`);
    }

    await connection.end();
  } catch (error) {
    console.error('Error deleting operator:', error.message);
    process.exit(1);
  }
}

deleteOperator();
