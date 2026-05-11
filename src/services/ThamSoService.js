// File: ThamSoService.js (ĐÃ SỬA)
const ThamSoRepo = require('../repositories/ThamSoRepo');

class ThamSoService {
    async getAllThamSo() {
        return await ThamSoRepo.getAll();
    }
    
    async getThamSoByName(TenThamSo) {
        return await ThamSoRepo.getByName(TenThamSo);
    }

    async updateThamSo(name, value) {
        const existing = await ThamSoRepo.getByName(name);
        if (existing === undefined) {
            throw { status: 404, message: `Không tìm thấy tham số '${name}' trong hệ thống!` };
        }

        if (value < 0) {
            throw { status: 400, message: 'Giá trị tham số không hợp lệ (phải lớn hơn hoặc bằng 0)!' };
        }

        await ThamSoRepo.update(name, value);
        return { message: `Cập nhật tham số ${name} thành ${value} thành công!` };
    }
}

module.exports = new ThamSoService();