const express = require('express');
const router = express.Router();
const ThamSoController = require('../controllers/ThamSoController');
const {XacThuc} = require('../middlewares/Authmiddleware');

router.get('/', XacThuc, ThamSoController.getAll);

module.exports = router;