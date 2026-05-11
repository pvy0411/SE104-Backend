const NhanVienRepo = require('../repositories/NhanVienRepo');

class NhanVienService {
    async getAll() {
        return await NhanVienRepo.getAll();
    }

    async create(data) {
        const isExist = await NhanVienRepo.checkUsernameExist(data.TenDangNhap);
        if (isExist) throw { status: 409, message: 'Tên đăng nhập này đã có người sử dụng!' };
        
        return await NhanVienRepo.create(data);
    }

    async update(MaNV, data) {
        const check = await NhanVienRepo.getById(MaNV);
        if (!check) throw { status: 404, message: 'Không tìm thấy nhân viên!' };
        
        await NhanVienRepo.update(MaNV, data);
        return { message: 'Cập nhật thành công!' };
    }

    async delete(MaNV) {
        const check = await NhanVienRepo.getById(MaNV);
        if (!check) throw { status: 404, message: 'Không tìm thấy nhân viên!' };

        const daKhamBenh = await NhanVienRepo.checkCoPhieuKham(MaNV);
        if (daKhamBenh) {
            throw { status: 400, message: 'Nhân viên này đã từng lập phiếu khám, không thể xóa để giữ lịch sử!' };
        }

        await NhanVienRepo.remove(MaNV);
        return { message: 'Đã xóa nhân viên và tài khoản!' };
    }
}
module.exports = new NhanVienService();