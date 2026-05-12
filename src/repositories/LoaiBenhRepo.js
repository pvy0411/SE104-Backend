const { sql, poolPromise } = require('../config/database');

class LoaiBenhRepo {
    // 1. Lấy danh sách tất cả các loại bệnh
    async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM LOAIBENH');
        return result.recordset;
    }

    // 2. Lưu chẩn đoán của bác sĩ vào phiếu khám
    async addChanDoan(MaPK, MaLoaiBenh, TrieuChung, GhiChu) {
        const pool = await poolPromise;
        await pool.request()
            .input('MaPK', sql.Int, MaPK)
            .input('MaLoaiBenh', sql.Int, MaLoaiBenh)
            .input('TrieuChung', sql.NVarChar, TrieuChung)
            .input('GhiChu', sql.NVarChar, GhiChu)
            .query(`
                INSERT INTO CT_LOAIBENH (MaPK, MaLoaiBenh, TrieuChung, GhiChu)
                VALUES (@MaPK, @MaLoaiBenh, @TrieuChung, @GhiChu)
            `);
        return true;
    }
}

module.exports = new LoaiBenhRepo();