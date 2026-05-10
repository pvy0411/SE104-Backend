const authService = require('../services/AuthService');

class AuthController {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ status: 'error', message: 'Vui lòng nhập đầy đủ thông tin!' });
            }

            const result = await authService.login(username, password);
            res.status(200).json({
                status: 'success',
                message: 'Đăng nhập thành công!',
                data: result
            });
        } catch (error) {
            res.status(401).json({
                status: 'error',
                message: error.message
            });
        }
    }
    async getMe(req, res) {
        try {
            // req.user chính là dữ liệu đã được giải mã từ Token bởi authMiddleware
            res.status(200).json({
                status: 'success',
                message: 'Bạn đã vượt qua chốt chặn bảo vệ!',
                data: req.user 
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: 'Lỗi server'
            });
        }
    }
}

module.exports = new AuthController();