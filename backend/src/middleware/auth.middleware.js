const jwt = require('jsonwebtoken');

// In production, store this secret securely (e.g., env variable)
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

/**
 * Middleware to verify JWT token and attach decoded user to request.
 * Expects Authorization header in the form "Bearer <token>".
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // e.g., { id, username, role }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = { verifyToken };
