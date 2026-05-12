const BaoCaoRepo = require('../repositories/BaoCaoRepo');

exports.GetDoanhThuTheoNam = async (nam) => {
    if (!nam) 
        throw { status: 400, message: 'Thiếu năm báo cáo' };
    return await BaoCaoRepo.GetDoanhThuTheoNam(parseInt(nam));
};
 
exports.GetDoanhThuTheoNgay = async (thang, nam) => {
    if (!thang || !nam) 
        throw { status: 400, message: 'Thiếu tháng hoặc năm' };
    return await BaoCaoRepo.GetDoanhThuTheoNgay(parseInt(thang), parseInt(nam));
};

exports.GetBaoCaoDoanhThu = async (thang, nam) => {
    const t = parseInt(thang);
    const n = parseInt(nam);
    if (!t || !n) throw { status: 400, message: 'Thiếu tháng hoặc năm' };
 
    // Kiểm tra báo cáo tháng này đã tồn tại chưa
    const existing = await BaoCaoRepo.CheckBaoCaoExists(t, n);
    if (existing) throw { status: 409, message: `Báo cáo tháng ${t}/${n} đã được lập` };
 
    // Tổng hợp từ HOADON: tổng doanh thu + tổng bệnh nhân
    const tongHop = await BaoCaoRepo.ThongKeDoanhThuTheoThang(t, n);
    const { TongDoanhThu, TongSoBenhNhan } = tongHop.tongHop;
 
    // Chi tiết từng ngày trong tháng với tỷ lệ đóng góp vào tổng doanh thu
    const chiTietTheoNgay = tongHop.chiTiet;
    const chiTietVoiTyLe = chiTietTheoNgay.map(item => ({
        Ngay:        item.Ngay,
        Thang:       t,
        Nam:         n,
        SoBenhNhan:  item.SoBenhNhan,
        DoanhThu:    item.DoanhThu,
        TyLe: TongDoanhThu > 0
            ? parseFloat((item.DoanhThu / TongDoanhThu).toFixed(4))
            : 0,
    }));
    // Lưu vào DB trong transaction
    await BaoCaoRepo.SaveBaoCaoDoanhThu(
        { Thang: t, Nam: n, TongDoanhThu, TongSoBenhNhan },
        chiTietVoiTyLe
    );
 
    return {
        Thang: t, Nam: n,
        TongDoanhThu, TongSoBenhNhan,
        ChiTiet: chiTietVoiTyLe,
    };
};

exports.GetBaoCaoSuDungThuoc = async (thang, nam) => {
    return await BaoCaoRepo.GetBaoCaoSuDungThuoc(thang, nam);
};

exports.GetBaoCaoNhapThuoc = async (thang, nam) => {
    return await BaoCaoRepo.GetBaoCaoNhapThuoc(thang, nam);
};