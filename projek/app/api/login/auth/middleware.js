const { verifyToken } = require('../utils/jwtToken');

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan atau format salah' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }

  req.user = decoded;
  next();
};

module.exports = { authenticate };
