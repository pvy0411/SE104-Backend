const BenhNhanRepo = require('../repositories/BenhNhanRepo');

class BenhNhanService {
    async createBenhNhan(data) {
        // Kiểm tra logic: CCCD đã tồn tại chưa?
        if (data.CCCD) {
            const isExist = await BenhNhanRepo.checkExists(data.CCCD);
            if (isExist) {
                throw new Error('Căn cước công dân này đã được đăng ký trong hệ thống!');
            }
        }
        
        // Nếu an toàn thì tiến hành lưu DB
        const MaBN = await BenhNhanRepo.create(data);
        return { MaBN, ...data };
    }
}

module.exports = new BenhNhanService();