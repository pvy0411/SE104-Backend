const express = require('express');
const router = express.Router();
const ThamSoController = require('../controllers/ThamSoController');
const {XacThuc} = require('../middlewares/AuthMiddleware');

router.get('/', XacThuc, ThamSoController.getAll);

module.exports = router;