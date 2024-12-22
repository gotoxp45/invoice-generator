const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).send('Access Denied');

  const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the decoded token to the request object
    next();
  } catch (err) {
    res.status(400).send('Invalid Token or expired');
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (!req.user || req.user.role !== role) {
    return res.status(403).send('Access Denied');
  }
  next();
};

module.exports = { authenticateJWT, authorizeRole };