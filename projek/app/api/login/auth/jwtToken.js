const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

const generateToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
