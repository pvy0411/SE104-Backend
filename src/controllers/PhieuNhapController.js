const PhieuNhapService = require('../services/PhieuNhapService');
const res_ = require('../utils/responseHelper.js'); 

// Lấy danh sách phiếu nhập
const GetAll = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const data = await PhieuNhapService.getAll({ page: +page, limit: +limit });
    res_.sendSuccess(res, 'Lấy danh sách phiếu nhập thành công', data, null, 200);
    } 
  catch (err) {
    const status = err.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, err.message, null, status);
    } else {
      res_.sendError(res, err.message, status);
    }
  }
};

// Lấy 1 phiếu nhập kèm danh sách chi tiết thuốc
const GetById = async (req, res) => {
  try {
    const data = await PhieuNhapService.getById(req.params.id);
    res_.sendSuccess(res, 'Lấy thông tin phiếu nhập thành công', data, null, 200);
  } 
  catch (err) {
    const status = err.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, err.message, null, status);
    } else {
      res_.sendError(res, err.message, status);
    }
  }
};

// Tạo phiếu nhập mới
const Create = async (req, res) => {
  try {
    const { chiTiet } = req.body;
    const maNV = req.user.MaNV;
    const data = await PhieuNhapService.createPhieuNhap(maNV, chiTiet);
    res_.sendSuccess(res, 'Tạo phiếu nhập thành công', data, null, 201);
  } 
  catch (err) {
    const status = err.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, err.message, null, status);
    } else {
      res_.sendError(res, err.message, status);
    }
  }
};

const Update = async (req, res) => {
  try {
    const { chiTiet } = req.body;
    const maNV = req.user.MaNV;
    const data = await PhieuNhapService.updatePhieuNhap(req.params.id, maNV, chiTiet);
    res_.sendSuccess(res, 'Cập nhật phiếu nhập thành công', data, null, 200);
  } 
  catch (err) {
    const status = err.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, err.message, null, status);
    } else {
      res_.sendError(res, err.message, status);
    }
  }
};
 
const Remove = async (req, res) => {
  try {
    await PhieuNhapService.deletePhieuNhap(req.params.id);
    res_.sendSuccess(res, 'Xóa phiếu nhập thành công', null, null, 200);
  } 
  catch (err) {
    const status = err.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, err.message, null, status);
    } else {
      res_.sendError(res, err.message, status);
    }
  }
};

module.exports = { GetAll, GetById, Create, Update, Remove };