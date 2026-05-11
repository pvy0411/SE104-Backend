const BenhNhanRepo = require('../repositories/BenhNhanRepo');

class BenhNhanService {
    async getAll() {
        return await BenhNhanRepo.getAll();
    }

    async create(data) {
        // Kiểm tra CCCD đã tồn tại chưa
        const isExisted = await BenhNhanRepo.checkExists(data.CCCD);
        if (isExisted) {
            throw { status: 409, message: 'Bệnh nhân với CCCD này đã tồn tại!' };
        }
        return await BenhNhanRepo.create(data);
    }

    async update(MaBN, dataUpdate) {
        const check = await BenhNhanRepo.getById(MaBN);
        if (!check) throw { status: 404, message: 'Không tìm thấy bệnh nhân!' };
        
        await BenhNhanRepo.update(MaBN, dataUpdate);
        return { message: 'Cập nhật thành công' };
    }

    async delete(MaBN) {
        const check = await BenhNhanRepo.getById(MaBN);
        if (!check) throw { status: 404, message: 'Không tìm thấy bệnh nhân!' };

        // Kiểm tra xem đã từng khám chưa
        const daKham = await BenhNhanRepo.checkCoPhieuKham(MaBN);
        if (daKham) {
            throw { status: 400, message: 'Bệnh nhân đã có lịch sử khám, không thể xóa!' };
        }
        return await BenhNhanRepo.remove(MaBN);
    }
}
module.exports = new BenhNhanService();