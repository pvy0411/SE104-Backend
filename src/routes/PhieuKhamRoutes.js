const express = require('express');
const router = express.Router();
const PhieuKhamController = require('../controllers/PhieuKhamController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Chỉ nhân viên y tế mới được lập phiếu khám
router.post('/', AuthMiddleware, PhieuKhamController.create);

module.exports = router;