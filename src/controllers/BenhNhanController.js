const BenhNhanService = require('../services/BenhNhanService');

class BenhNhanController {
    async create(req, res) {
        try {
            // Lấy dữ liệu từ body request
            const { TenBN, CCCD, GioiTinh, NgaySinh, DiaChi, SDT, Email } = req.body;

            // Kiểm tra các trường bắt buộc (dựa theo schema NOT NULL trong DB)
            if (!TenBN || !GioiTinh || !NgaySinh || !SDT) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Vui lòng nhập đầy đủ Tên, Giới tính, Ngày sinh và Số điện thoại!'
                });
            }

            const result = await BenhNhanService.createBenhNhan(req.body);

            res.status(201).json({
                status: 'success',
                message: 'Thêm bệnh nhân mới thành công!',
                data: result
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new BenhNhanController();