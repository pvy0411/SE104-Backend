const express = require('express');
const router = express.Router();
const ThamSoController = require('../controllers/ThamSoController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Route này yêu cầu phải có Token hợp lệ
router.get('/', AuthMiddleware, ThamSoController.getAll);

module.exports = router;