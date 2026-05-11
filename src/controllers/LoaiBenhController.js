const LoaiBenhService = require('../services/LoaiBenhService');

class LoaiBenhController {
    async getAll(req, res) {
        try {
            const data = await LoaiBenhService.getAll();
            res.status(200).json({ status: 'success', data });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    // ĐÂY CHÍNH LÀ HÀM ĐANG BỊ THIẾU GÂY RA LỖI Ở DÒNG 7
    async create(req, res) {
        try {
            const { TenBenh } = req.body;
            const id = await LoaiBenhService.create(TenBenh);
            res.status(201).json({ status: 'success', MaLoaiBenh: id });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { TenBenh } = req.body;
            const result = await LoaiBenhService.update(req.params.id, TenBenh);
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await LoaiBenhService.delete(req.params.id);
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }
}
module.exports = new LoaiBenhController();