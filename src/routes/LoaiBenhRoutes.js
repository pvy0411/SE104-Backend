const express = require('express');
const router = express.Router();
const LoaiBenhController = require('../controllers/LoaiBenhController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Route này chỉ Bác sĩ/Lễ tân mới vào được
router.get('/', AuthMiddleware, LoaiBenhController.getAll);
router.post('/chan-doan', AuthMiddleware, LoaiBenhController.createChanDoan);

module.exports = router;