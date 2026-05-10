const express = require('express');
const router = express.Router();
const BenhNhanController = require('../controllers/BenhNhanController');
const {XacThuc, PhanQuyen} = require('../middlewares/AuthMiddleware');

router.post('/', XacThuc, PhanQuyen('BacSi'), BenhNhanController.create);

module.exports = router;