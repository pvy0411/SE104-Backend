const { sql, poolPromise } = require('../config/database');

class PhieuKhamRepo {
    // Đếm số lượng bệnh nhân đã tiếp nhận trong 1 ngày cụ thể
    async countByDate(NgayKham) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('NgayKham', sql.Date, NgayKham)
            .query('SELECT COUNT(*) AS Total FROM PHIEUKHAM WHERE NgayKham = @NgayKham');
        return result.recordset[0].Total;
    }

    // Tạo phiếu khám mới
    async create(MaNV, MaBN, NgayKham) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('MaNV', sql.Int, MaNV)
            .input('MaBN', sql.Int, MaBN)
            .input('NgayKham', sql.Date, NgayKham)
            .query(`
                INSERT INTO PHIEUKHAM (MaNV, MaBN, NgayKham)
                OUTPUT INSERTED.MaPK 
                VALUES (@MaNV, @MaBN, @NgayKham)
            `);
        return result.recordset[0].MaPK;
    }
}

module.exports = new PhieuKhamRepo();