const CachDungRepo = require('../repositories/CachDungRepo');

exports.GetAll = async () => CachDungRepo.GetAll();

exports.GetById = async (id) => {
    const data = await CachDungRepo.GetById(id);
    if (!data) 
        throw { status: 404, message: 'Không tìm thấy cách dùng' };
    return data;
};

exports.Create = async (body) => {
    const { maCachDung, moTaCachDung } = body;
    if (!maCachDung || !moTaCachDung)
        throw { status: 400, message: 'Mã cách dùng và mô tả không được để trống' };
    const existing = await CachDungRepo.GetById(maCachDung);
    if (existing) 
        throw { status: 409, message: 'Mã cách dùng đã tồn tại' };
    await CachDungRepo.Create({ maCachDung, moTaCachDung });
    return CachDungRepo.GetById(maCachDung);
};

exports.Update = async (id, body) => {
    const { moTaCachDung } = body;
    if (!moTaCachDung) 
        throw { status: 400, message: 'Mô tả cách dùng không được để trống' };
    const existing = await CachDungRepo.GetById(id);
    if (!existing) 
        throw { status: 404, message: 'Không tìm thấy cách dùng' };
    await CachDungRepo.Update(id, { moTaCachDung });
    return CachDungRepo.GetById(id);
};

exports.Delete = async (id) => {
    const existing = await CachDungRepo.GetById(id);
    if (!existing) 
        throw { status: 404, message: 'Không tìm thấy cách dùng' };
    const used = await CachDungRepo.IsUsed(id);
    if (used) 
        throw { status: 400, message: 'Không thể xóa do đang được sử dụng' };
    await CachDungRepo.Delete(id);
};