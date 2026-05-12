const jwt = require('jsonwebtoken');

// MIDDLEWARE XÁC THỰC 
const XacThuc = (req, res, next) => {
    // Lấy token từ header 'Authorization: Bearer <token>'
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Không tìm thấy token, vui lòng đăng nhập!' });
    }
    try {
        // Giải mã token secret key cần khớp với key khi tạo token (trong .env)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'YOUR_SECRET_KEY'); 
        // Gán thông tin giải mã được (chứa TenChucVu) vào req.user
        req.user = decoded; 
        next();
    } 
    catch (error) {
        return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
    }
};

// MIDDLEWARE PHÂN QUYỀN
const PhanQuyen = (...danhSachQuyen) => {
    return (req, res, next) => {
        // Đảm bảo req.user đã được gán từ bước XacThuc
        if (!req.user || !req.user.TenChucVu) {
            return res.status(401).json({ message: 'Lỗi xác thực: Không tìm thấy thông tin chức vụ!' });
        }
        const chucVu = req.user.TenChucVu; 
        
        // Admin mặc định có toàn quyền, các role khác được cấp quyền theo nhiệm vụ
        if (chucVu === 'Admin' || danhSachQuyen.includes(chucVu)) {
            next(); // Hợp lệ -> Đi tiếp vào Controller
        } else {
            // Báo lỗi phân quyền
            res.status(403).json({ message: `Lỗi phân quyền: Chức vụ '${chucVu}' không được phép thực hiện thao tác này` });
        }
    };
};
module.exports = { XacThuc, PhanQuyen };