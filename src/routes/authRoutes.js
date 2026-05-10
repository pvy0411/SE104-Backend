const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

router.post('/login', AuthController.login);

router.get('/me', AuthMiddleware, AuthController.getMe);

module.exports = router;