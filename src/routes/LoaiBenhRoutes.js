const express = require('express');
const router = express.Router();
const LoaiBenhController = require('../controllers/LoaiBenhController');
const { XacThuc, PhanQuyen } = require('../middlewares/AuthMiddleware');

router.get('/', XacThuc, LoaiBenhController.getAll);
router.post('/', XacThuc, PhanQuyen('Admin'), LoaiBenhController.create);
router.put('/:id', XacThuc, PhanQuyen('Admin'), LoaiBenhController.update);
router.delete('/:id', XacThuc, PhanQuyen('Admin'), LoaiBenhController.delete);

module.exports = router;