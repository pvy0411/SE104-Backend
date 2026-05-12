const DonViTinhRepo = require('../repositories/DVTRepo');

exports.GetAll = async () => DonViTinhRepo.GetAll();

exports.GetById = async (id) => {
    const data = await DonViTinhRepo.GetById(id);
    if (!data) 
        throw { status: 404, message: 'Không tìm thấy đơn vị tính' };
    return data;
};

exports.Create = async (body) => {
    const { maDVT, tenDVT } = body;
    if (!maDVT || !tenDVT)
        throw { status: 400, message: 'Mã và tên đơn vị tính không được để trống' };
    const existing = await DonViTinhRepo.GetById(maDVT);
    if (existing) throw { status: 409, message: 'Mã đơn vị tính đã tồn tại' };
    await DonViTinhRepo.Create({ maDVT, tenDVT });
    return DonViTinhRepo.GetById(maDVT);
};

exports.Update = async (id, body) => {
    const { tenDVT } = body;
    if (!tenDVT) 
        throw { status: 400, message: 'Tên đơn vị tính không được để trống' };
    const existing = await DonViTinhRepo.GetById(id);
    if (!existing) 
        throw { status: 404, message: 'Không tìm thấy đơn vị tính' };
    await DonViTinhRepo.Update(id, { tenDVT });
    return DonViTinhRepo.GetById(id);
};

exports.Delete = async (id) => {
    const existing = await DonViTinhRepo.GetById(id);
    if (!existing) 
        throw { status: 404, message: 'Không tìm thấy đơn vị tính' };
    const used = await DonViTinhRepo.IsUsed(id);
    if (used) 
        throw { status: 400, message: 'Không thể xóa do đang được sử dụng' };
    await DonViTinhRepo.Delete(id);
};