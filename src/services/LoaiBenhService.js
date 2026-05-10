const LoaiBenhRepo = require('../repositories/LoaiBenhRepo');

class LoaiBenhService {
    async getDanhSachLoaiBenh() {
        return await LoaiBenhRepo.getAll();
    }

    async taoChanDoan(data) {
        // Có thể thêm logic kiểm tra xem Phiếu khám có tồn tại không ở đây
        // Nhưng để tối ưu, ta tiến hành lưu luôn
        await LoaiBenhRepo.addChanDoan(
            data.MaPK, 
            data.MaLoaiBenh, 
            data.TrieuChung, 
            data.GhiChu
        );
        return data;
    }
}

module.exports = new LoaiBenhService();