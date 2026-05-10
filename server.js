require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rootRoutes = require('./src/routes/Index');
const { sendError } = require('./src/utils/responseHelper');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Phân tích JSON body
app.use(express.urlencoded({ extended: true }));

// Định tuyến API
app.use('/api', rootRoutes);

// Đăng nhập
app.use('/api/auth', require('./src/routes/AuthRoutes'));

// Tham số
app.use('/api/tham-so', require('./src/routes/ThamSoRoutes'));

// Bệnh nhân
app.use('/api/benh-nhan', require('./src/routes/BenhNhanRoutes'));

// Phiếu khám
app.use('/api/phieu-kham', require('./src/routes/PhieuKhamRoutes'));


// Xử lý route không tồn tại (404)
app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'API endpoint không tồn tại trên hệ thống.'
    });
});

// Middleware xử lý lỗi tổng (Bắt lỗi từ các luồng không bắt được)
app.use((err, req, res, next) => {
    console.error('Lỗi hệ thống:', err.stack);
    sendError(res, 'Đã xảy ra lỗi nghiêm trọng tại máy chủ.');
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
    // Kích hoạt kết nối DB ngay khi chạy server
    require('./src/config/database'); 
});

