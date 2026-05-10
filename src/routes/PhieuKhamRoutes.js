const express = require('express');
const router = express.Router();
const PhieuKhamController = require('../controllers/PhieuKhamController');
const {XacThuc, PhanQuyen} = require('../middlewares/AuthMiddleware');

// Chỉ nhân viên y tế mới được lập phiếu khám
router.post('/', XacThuc, PhanQuyen('BacSi'), PhieuKhamController.create);

module.exports = router;