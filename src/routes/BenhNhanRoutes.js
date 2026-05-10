const express = require('express');
const router = express.Router();
const BenhNhanController = require('../controllers/BenhNhanController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// Route này được bảo vệ bởi authMiddleware
router.post('/', AuthMiddleware, BenhNhanController.create);

module.exports = router;