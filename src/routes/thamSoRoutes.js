const express = require('express');
const router = express.Router();
const thamSoController = require('../controllers/ThamSoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Route này yêu cầu phải có Token hợp lệ
router.get('/', authMiddleware, thamSoController.getAll);

module.exports = router;