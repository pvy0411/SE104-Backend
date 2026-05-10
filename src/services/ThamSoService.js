const ThamSoRepo = require('../repositories/ThamSoRepo');

class ThamSoService {
    async getAllThamSo() {
        return await ThamSoRepo.getAll();
    }
    
    async getThamSoByName(TenThamSo) {
        return await ThamSoRepo.getByName(TenThamSo);
    }
}

module.exports = new ThamSoService();