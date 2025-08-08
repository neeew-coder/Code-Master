const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ Preflight handlers for CORS
router.options('/register', (req, res) => res.sendStatus(200));
router.options('/login', (req, res) => res.sendStatus(200));

// Register
router.post('/register', authController.register);

// Login
router.post('/login', authController.login);

module.exports = router;
