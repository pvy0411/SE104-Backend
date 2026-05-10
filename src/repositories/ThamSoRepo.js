const { sql, poolPromise } = require('../config/database');

class ThamSoRepo {
    // Lấy toàn bộ tham số
    async getAll() {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM THAMSO');
        return result.recordset;
    }

    // Lấy giá trị của 1 tham số cụ thể (VD: truyền vào 'SoBenhNhanToiDa')
    async getByName(tenThamSo) {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('tenThamSo', sql.NVarChar, tenThamSo)
            .query('SELECT GiaTri FROM THAMSO WHERE TenThamSo = @tenThamSo');
        
        if (result.recordset.length > 0) {
            return result.recordset[0].GiaTri;
        }
        return null;
    }
}

module.exports = new ThamSoRepo();