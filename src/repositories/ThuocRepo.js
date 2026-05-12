const { poolPromise } = require('../config/database');
const sql = require('mssql');

exports.GetAllThuoc = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM THUOC');
  return result.recordset;
};

exports.GetThuocById = async (id) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('id', sql.NVarChar, id)
    .query('SELECT * FROM THUOC WHERE MaThuoc = @id');
  return result.recordset[0];
};

exports.SearchThuocByName = async (keyword) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('keyword', sql.NVarChar, `%${keyword}%`)
        .query(`
            SELECT TOP 20
                t.MaThuoc, t.TenThuoc, t.DonGiaBan, t.SoLuongTon,
                cd.MoTaCachDung, dvt.TenDVT
            FROM  THUOC t
            JOIN  CACHDUNG   cd  ON t.MaCachDung = cd.MaCachDung
            JOIN  DONVITINH  dvt ON t.MaDVT      = dvt.MaDVT
            WHERE t.TenThuoc LIKE @keyword
            ORDER BY t.TenThuoc
        `);
    return result.recordset;
};

exports.UpdateInventoryAndPrice = async (maThuoc, soLuong, donGiaBan, transaction) => {
  const request = transaction ? transaction.request() : (await poolPromise).request();
  await request
    .input('MaThuoc', sql.NVarChar, maThuoc)
    .input('SoLuong', sql.Int, soLuong)
    .input('DonGia', sql.Float, donGiaBan)
    .query('UPDATE THUOC SET SoLuongTon = SoLuongTon + @SoLuong, DonGiaBan = @DonGia WHERE MaThuoc = @MaThuoc');
};

exports.UpdateStock = async (maThuoc, soLuongThayDoi, transaction) => {
  const request = transaction ? transaction.request() : (await poolPromise).request();
  await request
    .input('MaThuoc', sql.NVarChar, maThuoc)
    .input('SoLuong', sql.Int, soLuongThayDoi) // nếu là xuất/kê đơn -> SoLuong âm, nếu nhập -> SoLuong duong
    .query('UPDATE THUOC SET SoLuongTon = SoLuongTon + @SoLuong WHERE MaThuoc = @MaThuoc');
};

exports.CreateThuoc = async (thuoc) => {
  const pool = await poolPromise;
  await pool.request()
    .input('MaThuoc',    sql.NVarChar, thuoc.maThuoc)
    .input('TenThuoc',   sql.NVarChar, thuoc.tenThuoc)
    .input('DonGiaBan',  sql.Float,    thuoc.donGiaBan || 0)
    .input('SoLuongTon', sql.Int,      thuoc.soLuongTon || 0)
    .input('MaCachDung', sql.NVarChar, thuoc.maCachDung)
    .input('MaDVT',      sql.NVarChar, thuoc.maDVT)
    .query(`
      INSERT INTO THUOC (MaThuoc, TenThuoc, DonGiaBan, SoLuongTon, MaCachDung, MaDVT)
      VALUES (@MaThuoc, @TenThuoc, @DonGiaBan, @SoLuongTon, @MaCachDung, @MaDVT)
    `);
};

exports.UpdateThuoc = async (maThuoc, thuoc) => {
  const pool = await poolPromise;
  await pool.request()
    .input('MaThuoc',    sql.NVarChar, maThuoc)
    .input('TenThuoc',   sql.NVarChar, thuoc.tenThuoc)
    .input('DonGiaBan',  sql.Float,    thuoc.donGiaBan)
    .input('MaCachDung', sql.NVarChar, thuoc.maCachDung)
    .input('MaDVT',      sql.NVarChar, thuoc.maDVT)
    .query(`
      UPDATE THUOC
      SET TenThuoc   = @TenThuoc,
          DonGiaBan  = @DonGiaBan,
          MaCachDung = @MaCachDung,
          MaDVT      = @MaDVT
      WHERE MaThuoc = @MaThuoc
    `);
};
 
exports.DeleteThuoc = async (maThuoc) => {
  const pool = await poolPromise;
  await pool.request()
    .input('MaThuoc', sql.NVarChar, maThuoc)
    .query('DELETE FROM THUOC WHERE MaThuoc = @MaThuoc');
};
 
exports.IsThuocUsed = async (maThuoc) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('MaThuoc', sql.NVarChar, maThuoc)
    .query(`
      SELECT COUNT(*) AS cnt FROM CT_PHIEUKHAM WHERE MaThuoc = @MaThuoc
      UNION ALL
      SELECT COUNT(*) FROM CT_PHIEUNHAPTHUOC WHERE MaThuoc = @MaThuoc
    `);
  return result.recordset.some(r => r.cnt > 0);
};