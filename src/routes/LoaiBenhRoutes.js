const express = require('express');
const router = express.Router();
const LoaiBenhController = require('../controllers/LoaiBenhController');
const {XacThuc, PhanQuyen} = require('../middlewares/AuthMiddleware');

router.get('/', XacThuc, LoaiBenhController.getAll);
router.post('/chan-doan', XacThuc, PhanQuyen('BacSi'), LoaiBenhController.createChanDoan);

module.exports = router;