const { sql, poolPromise } = require('../config/database');

class AuthRepo {
    async findAccountByUsername(username) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query(`
                SELECT tk.TenDangNhap, tk.MatKhau, tk.MaNV, nv.TenNV, nv.MaCV
                FROM TAIKHOAN tk
                JOIN NHANVIEN nv ON tk.MaNV = nv.MaNV
                WHERE tk.TenDangNhap = @username
            `);
        return result.recordset[0];
    }
}

module.exports = new AuthRepo();