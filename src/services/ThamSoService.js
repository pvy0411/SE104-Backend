const ThamSoRepo = require('../repositories/ThamSoRepo');

class ThamSoService {
    async getAllThamSo() {
        return await ThamSoRepo.getAll();
    }
    
    async getThamSoByName(tenThamSo) {
        return await ThamSoRepo.getByName(tenThamSo);
    }
}

module.exports = new ThamSoService();