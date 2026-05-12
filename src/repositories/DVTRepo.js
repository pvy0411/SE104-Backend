const { poolPromiseoolPromise } = require('../config/database');
const sql = require('mssql');

exports.GetAll = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM DONVITINH ORDER BY MaDVT');
    return result.recordset;
};

exports.GetById = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('MaDVT', sql.NVarChar, id)
        .query('SELECT * FROM DONVITINH WHERE MaDVT = @MaDVT');
    return result.recordset[0] || null;
};

exports.Create = async ({ MaDVT, TenDVT }) => {
    const pool = await poolPromise;
    await pool.request()
        .input('MaDVT',  sql.NVarChar, MaDVT)
        .input('TenDVT', sql.NVarChar, TenDVT)
        .query('INSERT INTO DONVITINH (MaDVT, TenDVT) VALUES (@MaDVT, @TenDVT)');
};

exports.Update = async (id, { TenDVT }) => {
    const pool = await poolPromise;
    await pool.request()
        .input('MaDVT',  sql.NVarChar, id)
        .input('TenDVT', sql.NVarChar, TenDVT)
        .query('UPDATE DONVITINH SET TenDVT = @TenDVT WHERE MaDVT = @MaDVT');
};

exports.Delete = async (id) => {
    const pool = await poolPromise;
    await pool.request()
        .input('MaDVT', sql.NVarChar, id)
        .query('DELETE FROM DONVITINH WHERE MaDVT = @MaDVT');
};

// Kiểm tra DVT đang được dùng bởi thuốc nào chưa
exports.IsUsed = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('MaDVT', sql.NVarChar, id)
        .query('SELECT COUNT(*) AS cnt FROM THUOC WHERE MaDVT = @MaDVT');
    return result.recordset[0].cnt > 0;
};