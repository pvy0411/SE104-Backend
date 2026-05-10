const jwt = require('jsonwebtoken');
const AuthRepo = require('../repositories/AuthRepo');

class AuthService {
    async login(username, password) {
        // 1. Tìm tài khoản
        const account = await AuthRepo.findAccountByUsername(username);
        if (!account) throw new Error('Tài khoản không tồn tại!');

        // 2. So sánh mật khẩu 
        if (account.MatKhau !== password) {
            throw new Error('Mật khẩu không chính xác!');
        }

        // 3. Tạo JWT Token chứa thông tin cần thiết
        const payload = {
            MaNV: account.MaNV,
            TenNV: account.TenNV,
            MaCV: account.MaCV // Dùng để phân quyền sau này
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });

        return {
            token,
            user: payload
        };
    }
}

module.exports = new AuthService();