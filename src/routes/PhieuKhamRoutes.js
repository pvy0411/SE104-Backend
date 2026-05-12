const express = require('express');
const router = express.Router();
const PhieuKhamController = require('../controllers/PhieuKhamController');
const {XacThuc, PhanQuyen} = require('../middlewares/Authmiddleware');

router.post('/', XacThuc, PhanQuyen('BacSi'), PhieuKhamController.create);

module.exports = router;