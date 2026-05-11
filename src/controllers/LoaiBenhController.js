const LoaiBenhService = require('../services/LoaiBenhService');

class LoaiBenhController {
    // API GET: Lấy danh sách loại bệnh
    async getAll(req, res) {
        try {
            const listLoaiBenh = await LoaiBenhService.getDanhSachLoaiBenh();
            res.status(200).json({
                status: 'success',
                data: listLoaiBenh
            });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    // API POST: Thêm chẩn đoán
    async createChanDoan(req, res) {
        try {
            const { MaPK, MaLoaiBenh, TrieuChung, GhiChu } = req.body;

            if (!MaPK || !MaLoaiBenh) {
                return res.status(400).json({ 
                    status: 'error', 
                    message: 'Vui lòng cung cấp Mã phiếu khám và Mã loại bệnh!' 
                });
            }

            const result = await LoaiBenhService.taoChanDoan(req.body);

            res.status(201).json({
                status: 'success',
                message: 'Đã lưu chẩn đoán bệnh thành công!',
                data: result
            });
        } catch (error) {
            res.status(400).json({ status: 'error', message: error.message });
        }
    }
}

module.exports = new LoaiBenhController();