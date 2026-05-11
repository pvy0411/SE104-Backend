const BenhNhanService = require('../services/BenhNhanService');

class BenhNhanController {
    async getAll(req, res) {
        try {
            const data = await BenhNhanService.getAll();
            res.status(200).json({ status: 'success', data });
        } catch (error) {
            res.status(500).json({ status: 'error', message: error.message });
        }
    }

    async create(req, res) {
        try {
            const id = await BenhNhanService.create(req.body);
            res.status(201).json({ status: 'success', maBN: id });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }

    async update(req, res) {
        try {
            const result = await BenhNhanService.update(req.params.id, req.body);
            res.status(200).json({ status: 'success', data: result });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }

    async delete(req, res) {
        try {
            await BenhNhanService.delete(req.params.id);
            res.status(200).json({ status: 'success', message: 'Đã xóa bệnh nhân' });
        } catch (error) {
            res.status(error.status || 500).json({ status: 'error', message: error.message });
        }
    }
}
module.exports = new BenhNhanController();