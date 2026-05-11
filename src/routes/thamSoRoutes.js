const express = require('express');
const router = express.Router();
const ThamSoController = require('../controllers/ThamSoController');
const { XacThuc, PhanQuyen } = require('../middlewares/AuthMiddleware');

router.get('/', XacThuc, ThamSoController.getAll);
router.get('/:name', XacThuc, ThamSoController.getByName);
router.put('/:name', XacThuc, PhanQuyen('Admin'), ThamSoController.update);

module.exports = router;