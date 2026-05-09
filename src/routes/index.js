const express = require('express');
const router = express.Router();

// Import các routes của Dev A & Dev B (Sẽ tạo sau)
// const authRoutes = require('./authRoutes');
// const khamBenhRoutes = require('./khamBenhRoutes');
// const thuocRoutes = require('./thuocRoutes');

router.get('/health-check', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Hệ thống Quản lý Phòng mạch tư đang hoạt động tốt!' });
});

// Sử dụng các routes
// router.use('/auth', authRoutes);
// router.use('/kham-benh', khamBenhRoutes);
// router.use('/thuoc', thuocRoutes);

module.exports = router;