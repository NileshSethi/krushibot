const express = require('express');
const { signup, login, verifySession, logout } = require('../controllers/authController');
const { requireAuth } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/session', requireAuth, verifySession);

module.exports = router;
