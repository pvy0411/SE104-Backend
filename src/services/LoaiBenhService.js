const LoaiBenhRepo = require('../repositories/LoaiBenhRepo');

class LoaiBenhService {
    async getDanhSachLoaiBenh() {
        return await LoaiBenhRepo.getAll();
    }

    async taoChanDoan(data) {
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