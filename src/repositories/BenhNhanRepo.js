const { sql, poolPromise } = require('../config/database');

class BenhNhanRepo {
    // Kiểm tra bệnh nhân đã tồn tại qua CCCD
    async checkExists(cccd) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('cccd', sql.VarChar, cccd)
            .query('SELECT MaBN FROM BENHNHAN WHERE CCCD = @cccd');
        return result.recordset.length > 0;
    }

    // Thêm bệnh nhân mới
    async create(data) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('tenBN', sql.NVarChar, data.tenBN)
            .input('cccd', sql.VarChar, data.cccd)
            .input('gioiTinh', sql.VarChar, data.gioiTinh)
            .input('ngaySinh', sql.Date, data.ngaySinh)
            .input('diaChi', sql.NVarChar, data.diaChi)
            .input('sdt', sql.VarChar, data.sdt)
            .input('email', sql.VarChar, data.email)
            .query(`
                INSERT INTO BENHNHAN (TenBN, CCCD, GioiTinh, NgaySinh, DiaChi, SDT, Email)
                OUTPUT INSERTED.MaBN -- Trả về luôn Mã bệnh nhân vừa được tạo tự động
                VALUES (@tenBN, @cccd, @gioiTinh, @ngaySinh, @diaChi, @sdt, @email)
            `);
        return result.recordset[0].MaBN;
    }
}

module.exports = new BenhNhanRepo();