const express = require('express');
const router = express.Router();
const NhanVienController = require('../controllers/NhanVienController');
const { XacThuc, PhanQuyen } = require('../middlewares/AuthMiddleware');

router.get(
    '/', 
    XacThuc, 
    PhanQuyen('Admin'), 
    NhanVienController.getAll
);

router.post(
    '/', 
    XacThuc, 
    PhanQuyen('Admin'), 
    NhanVienController.create
);

router.put(
    '/:id', 
    XacThuc, 
    PhanQuyen('Admin'), 
    NhanVienController.update
);

router.delete(
    '/:id', 
    XacThuc, 
    PhanQuyen('Admin'), 
    NhanVienController.delete
);

module.exports = router;
