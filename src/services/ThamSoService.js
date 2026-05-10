const thamSoRepo = require('../repositories/ThamSoRepo');

class ThamSoService {
    async getAllThamSo() {
        return await thamSoRepo.getAll();
    }
    
    async getThamSoByName(tenThamSo) {
        return await thamSoRepo.getByName(tenThamSo);
    }
}

module.exports = new ThamSoService();