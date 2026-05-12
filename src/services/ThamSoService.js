const thamSoRepository = require('../repositories/thamSoRepository');

const DanhSachThamSo = async () => {
    // goi ham TruyVanThamSo o repository
    const danhSach = await thamSoRepository.TruyVanThamSo();
    return danhSach;
};
module.exports = {DanhSachThamSo};