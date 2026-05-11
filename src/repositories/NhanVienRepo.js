const { sql, poolPromise } = require('../config/database');

class NhanVienRepo {
    async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT NV.MaNV, NV.TenNV, NV.GioiTinh, NV.NamSinh, NV.SDT, 
                   CV.TenCV, CK.TenCK, TK.TenDangNhap
            FROM NHANVIEN NV
            JOIN CHUCVU CV ON NV.MaCV = CV.MaCV
            LEFT JOIN CHUYENKHOA CK ON NV.MaCK = CK.MaCK
            LEFT JOIN TAIKHOAN TK ON NV.MaNV = TK.MaNV
        `);
        return result.recordset;
    }

    async getById(MaNV) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaNV', sql.Int, MaNV)
            .query('SELECT * FROM NHANVIEN WHERE MaNV = @MaNV');
        return result.recordset[0];
    }

    async checkUsernameExist(username) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT TenDangNhap FROM TAIKHOAN WHERE TenDangNhap = @username');
        return result.recordset.length > 0;
    }

    // Tạo Nhân viên + Tài khoản cùng lúc
    async create(data) {
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            const requestNV = new sql.Request(transaction);
            const resultNV = await requestNV
                .input('TenNV', sql.NVarChar, data.TenNV)
                .input('GioiTinh', sql.VarChar, data.GioiTinh)
                .input('NamSinh', sql.Int, data.NamSinh)
                .input('SDT', sql.VarChar, data.SDT)
                .input('MaCV', sql.Int, data.MaCV)
                .input('MaCK', sql.Int, data.MaCK || null)
                .query(`
                    INSERT INTO NHANVIEN (TenNV, GioiTinh, NamSinh, SDT, MaCV, MaCK)
                    OUTPUT INSERTED.MaNV
                    VALUES (@TenNV, @GioiTinh, @NamSinh, @SDT, @MaCV, @MaCK)
                `);
            
            const MaNVMoi = resultNV.recordset[0].MaNV;

            const requestTK = new sql.Request(transaction);
            await requestTK
                .input('TenDangNhap', sql.VarChar, data.TenDangNhap)
                .input('MatKhau', sql.VarChar, data.MatKhau)
                .input('MaNV', sql.Int, MaNVMoi)
                .query(`
                    INSERT INTO TAIKHOAN (TenDangNhap, MatKhau, MaNV)
                    VALUES (@TenDangNhap, @MatKhau, @MaNV)
                `);

            await transaction.commit();
            return MaNVMoi;
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }

    // Cập nhật thông tin nhân sự
    async update(MaNV, data) {
        const pool = await poolPromise;
        await pool.request()
            .input('MaNV', sql.Int, MaNV)
            .input('TenNV', sql.NVarChar, data.TenNV)
            .input('SDT', sql.VarChar, data.SDT)
            .input('MaCK', sql.Int, data.MaCK || null)
            .query('UPDATE NHANVIEN SET TenNV = @TenNV, SDT = @SDT, MaCK = @MaCK WHERE MaNV = @MaNV');
    }

    async checkCoPhieuKham(MaNV) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaNV', sql.Int, MaNV)
            .query('SELECT COUNT(*) as Count FROM PHIEUKHAM WHERE MaNV = @MaNV');
        return result.recordset[0].Count > 0;
    }

    // Xóa tài khoản trước, xóa nhân viên sau
    async remove(MaNV) {
        const pool = await poolPromise;
        const transaction = new sql.Transaction(pool);
        await transaction.begin();

        try {
            const request = new sql.Request(transaction);
            request.input('MaNV', sql.Int, MaNV);
            await request.query('DELETE FROM TAIKHOAN WHERE MaNV = @MaNV');
            await request.query('DELETE FROM NHANVIEN WHERE MaNV = @MaNV');
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    }
}
module.exports = new NhanVienRepo();