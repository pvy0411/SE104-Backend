const thamSoService = require('../services/ThamSoService');

class ThamSoController {
    async getAll(req, res) {
        try {
            const thamSo = await thamSoService.getAllThamSo();
            res.status(200).json({
                status: 'success',
                data: thamSo
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

module.exports = new ThamSoController();