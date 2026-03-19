const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { operator_id, email, password } = req.body;

  if (!operator_id || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [existingUsers] = await db.execute(
      'SELECT id FROM operators WHERE operator_id = ? OR email = ? LIMIT 1',
      [operator_id, email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'USER_EXISTS' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    await db.execute(
      'INSERT INTO operators (operator_id, email, password_hash) VALUES (?, ?, ?)',
      [operator_id, email, password_hash]
    );

    return res.status(201).json({ message: 'REGISTERED' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { operator_id, password } = req.body;

  if (!operator_id || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [users] = await db.execute('SELECT * FROM operators WHERE operator_id = ? LIMIT 1', [operator_id]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch) {
      return res.status(401).json({ message: 'INVALID_PASSWORD' });
    }

    const payload = {
      id: user.id,
      operator_id: user.operator_id
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return token (client stores in localStorage and sends via Authorization header)
    return res.status(200).json({ message: 'SUCCESS', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'LOGGED_OUT' });
};

exports.verifySession = (req, res) => {
  return res.status(200).json({ user: req.user });
};
