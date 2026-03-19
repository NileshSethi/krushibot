const jwt = require('jsonwebtoken');

// Verify JWT from Authorization: Bearer <token>. No redirects here—API should just 401.
exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const parts = authHeader.split(' ');
  const token = parts.length === 2 && parts[0] === 'Bearer' ? parts[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'UNAUTHORIZED' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'INVALID_TOKEN' });
  }
};
