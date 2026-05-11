const NhanVienService = require('../services/NhanVienService');

class NhanVienController {
    async getAll(req, res) {
        try {
            const data = await NhanVienService.getAll();
            res.status(200).json({ status: 'success', data });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async create(req, res) {
        try {
            const id = await NhanVienService.create(req.body);
            res.status(201).json({ status: 'success', message: 'Thêm nhân viên thành công', MaNV: id });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await NhanVienService.update(req.params.id, req.body);
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const result = await NhanVienService.delete(req.params.id);
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }
}
module.exports = new NhanVienController();