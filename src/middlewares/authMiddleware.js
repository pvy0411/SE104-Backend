const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // 1. Lấy token từ header của request gửi lên
    const authHeader = req.header('Authorization');

    // Nếu không có header Authorization, từ chối ngay
    if (!authHeader) {
        return res.status(401).json({ 
            status: 'error', 
            message: 'Truy cập bị từ chối! Không tìm thấy Token.' 
        });
    }

    try {
        // Token thường gửi theo chuẩn "Bearer <chuỗi_token>", nên ta cần cắt lấy phần đuôi
        const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

        // 2. Dùng JWT_SECRET để giải mã và xác thực
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Nếu đúng, lưu thông tin user (maNV, tenNV, maCV) vào request để các API sau xài
        req.user = decoded; 
        
        // Cho phép đi tiếp vào Controller
        next(); 
    } catch (error) {
        // Nếu token sai chữ ký hoặc hết hạn
        return res.status(401).json({ 
            status: 'error', 
            message: 'Token không hợp lệ hoặc đã hết hạn!' 
        });
    }
};

module.exports = authMiddleware;