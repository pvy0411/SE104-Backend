const express = require('express');
const router = express.Router();
const BenhNhanController = require('../controllers/BenhNhanController');
const {XacThuc, PhanQuyen} = require('../middlewares/AuthMiddleware');

router.get('/', XacThuc, BenhNhanController.getAll);
router.post('/', XacThuc, BenhNhanController.create);
router.put('/:id', XacThuc, PhanQuyen('LeTan'), BenhNhanController.update);
router.delete('/:id', XacThuc, BenhNhanController.delete);

module.exports = router;