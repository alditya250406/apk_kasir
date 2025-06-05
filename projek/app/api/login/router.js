const express = require('express');
const router = express.Router();

const authController = require('./controller');

// Routing untuk register dan login
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
