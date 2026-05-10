const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const {XacThuc} = require('../middlewares/AuthMiddleware');

router.post('/login', AuthController.login);

router.get('/me', XacThuc, AuthController.getMe);

module.exports = router;