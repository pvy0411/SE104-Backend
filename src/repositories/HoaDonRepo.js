const { poolPromise } = require('../config/database');
const sql = require('mssql');

exports.GetAll = async (page, limit) => {
  const pool = await poolPromise;
  const offset = (page - 1) * limit;
  const result = await pool.request().query(`
    SELECT hd.MaHD, hd.MaPK, hd.NgayLap,
            hd.TongTienThuoc, hd.TienKham, hd.TongTien,
            bn.TenBN, nv.TenNV AS TenNhanVien
    FROM HOADON hd
    JOIN PHIEUKHAM pk ON hd.MaPK = pk.MaPK
    JOIN BENHNHAN bn  ON pk.MaBN = bn.MaBN
    JOIN NHANVIEN nv  ON pk.MaNV = nv.MaNV
    ORDER BY hd.NgayLap DESC
    OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY
  `);
  return result.recordset;
};

exports.GetById = async (maHD) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('MaHD', sql.NVarChar, maHD)
    .query(`
      SELECT hd.MaHD, hd.MaPK, hd.NgayLap,
              hd.TongTienThuoc, hd.TienKham, hd.TongTien,
              bn.TenBN, nv.TenNV AS TenNhanVien
      FROM HOADON hd
      JOIN PHIEUKHAM pk ON hd.MaPK = pk.MaPK
      JOIN BENHNHAN bn  ON pk.MaBN = bn.MaBN
      JOIN NHANVIEN nv  ON pk.MaNV = nv.MaNV
      WHERE hd.MaHD = @MaHD
    `);
  return result.recordset[0];
};

exports.GetByMaPK = async (maPK) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('MaPK', sql.NVarChar, maPK)
    .query('SELECT * FROM HOADON WHERE MaPK = @MaPK');
  return result.recordset[0];
};

exports.GetTongTienThuoc = async (maPK) => {
  const pool = await poolPromise;
    const result = await pool.request()
      .input('MaPK', sql.NVarChar, maPK)
      .query('SELECT SUM(ThanhTien) AS TongTien FROM CT_PHIEUKHAM WHERE MaPK = @MaPK');
    return result.recordset[0].TongTien || 0;
};

exports.CreateHoaDon = async ({ maPK, ngayLap, tongTienThuoc, tienKham, tongTien }, transaction) => {
  const request = transaction ? transaction.request() : (await poolPromise).request();
  const result = await request
    .input('MaPK', sql.NVarChar, maPK)
    .input('NgayLap', sql.DateTime, ngayLap)
    .input('TongTienThuoc', sql.Float, tongTienThuoc)
    .input('TienKham', sql.Float, tienKham)
    .input('TongTien', sql.Float, tongTien)
    .query(`
      INSERT INTO HOADON (MaPK, NgayLap, TongTienThuoc, TienKham, TongTien) 
      OUTPUT INSERTED.MaHD
      VALUES (@MaPK, @NgayLap, @TongTienThuoc, @TienKham, @TongTien)
    `);
  return result.recordset[0].MaHD;
};

exports.DeleteHoaDon = async (maHD, transaction) => {
  const request = transaction.request();
  await request
    .input('MaHD', sql.NVarChar, maHD)
    .query('DELETE FROM HOADON WHERE MaHD = @MaHD');
};

exports.CheckPhieuKham = async (maPK) => {
  const pool = await poolPromise;
  const result = await pool.request()
    .input('MaPK', sql.NVarChar, maPK)
    .query('SELECT MaPK FROM PHIEUKHAM WHERE MaPK = @MaPK');
  return result.recordset[0] || null;
};

// sinh mã hóa đơn tự động
exports.GenerateMaHD = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query(`
    SELECT TOP 1 MaHD FROM HOADON ORDER BY MaHD DESC
  `);
  if (!result.recordset[0]) return 'HD001';
  const lastNum = parseInt(result.recordset[0].MaHD.replace('HD', '')) + 1;
  return 'HD' + String(lastNum).padStart(3, '0');
};
