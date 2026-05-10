const express = require('express');
const router = express.Router();
const BenhNhanController = require('../controllers/BenhNhanController');
const {XacThuc, PhanQuyen} = require('../middlewares/AuthMiddleware');

// Route này được bảo vệ bởi authMiddleware
router.post('/', XacThuc, PhanQuyen('BacSi'), BenhNhanController.create);

module.exports = router;