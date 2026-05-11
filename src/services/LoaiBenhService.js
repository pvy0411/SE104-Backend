const LoaiBenhRepo = require('../repositories/LoaiBenhRepo');

class LoaiBenhService {
    async getAll() {
        return await LoaiBenhRepo.getAll();
    }

    async create(tenBenh) {
        if (!tenBenh) throw { status: 400, message: 'Vui lòng cung cấp tên loại bệnh!' };
        return await LoaiBenhRepo.create(tenBenh);
    }

    async update(maLoaiBenh, tenBenh) {
        if (!tenBenh) throw { status: 400, message: 'Vui lòng cung cấp tên loại bệnh mới!' };
        await LoaiBenhRepo.update(maLoaiBenh, tenBenh);
        return { message: 'Cập nhật thành công!' };
    }

    async delete(maLoaiBenh) {
        const daSuDung = await LoaiBenhRepo.checkDaSuDung(maLoaiBenh);
        if (daSuDung) {
            throw { status: 400, message: 'Loại bệnh này đã có trong hồ sơ bệnh án, không thể xóa!' };
        }
        await LoaiBenhRepo.remove(maLoaiBenh);
        return { message: 'Đã xóa loại bệnh!' };
    }
}
module.exports = new LoaiBenhService();