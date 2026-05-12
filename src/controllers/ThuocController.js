const ThuocService = require('../services/ThuocService');
const res_ = require('../utils/responseHelper.js');

exports.GetAllThuoc = async (req, res) => {
  try {
    const data = await ThuocService.getAllThuoc();
    res_.sendSuccess(res, 'Lấy danh sách thuốc thành công', data, null, 200);
  } 
  catch (e) {
    const status = e.status || 500;
    if (status >= 400 && status < 500) {
    res_.sendFail(res, e.message, null, status);
    } else {
      res_.sendError(res, e.message, status);
    }
  }
};

exports.GetThuocById = async (req, res) => {
  try {
    const data = await ThuocService.getThuocById(req.params.id);
    res_.sendSuccess(res, 'Lấy thông tin thuốc thành công', data, null, 200);
  } 
  catch (e) {
    const status = e.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, e.message, null, status);
    } else {
      res_.sendError(res, e.message, status);
    }
  }
};

exports.SearchThuoc = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) throw { status: 400, message: 'Thiếu từ khoá tìm kiếm (?q=...)' };
    const data = await ThuocService.SearchThuoc(q);
    res_.sendSuccess(res, 'Tìm kiếm thuốc thành công', data, null, 200);
  } 
  catch (e) { 
    const status = e.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, e.message, null, status);
    } else {
      res_.sendError(res, e.message, status);
    } 
  }
};

exports.CreateThuoc = async (req, res) => {
  try {
    const data = await ThuocService.createThuoc(req.body);
    res_.sendSuccess(res, 'Tạo thuốc thành công', data, null, 201);
  } 
    catch (e) { 
    const status = e.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, e.message, null, status);
    } else {
      res_.sendError(res, e.message, status);
    } 
  }
};
 
exports.UpdateThuoc = async (req, res) => {
  try {
    const data = await ThuocService.updateThuoc(req.params.id, req.body);
    res_.sendSuccess(res, 'Cập nhật thuốc thành công', data, null, 200);
  } 
  catch (e) { 
    const status = e.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, e.message, null, status);
    } else {
      res_.sendError(res, e.message, status);
    } 
  }
};
 
exports.DeleteThuoc = async (req, res) => {
  try {
    await ThuocService.deleteThuoc(req.params.id);
    res_.sendSuccess(res, 'Xóa thuốc thành công', null, null, 200);
  } 
  catch (e) { 
    const status = e.status || 500;
    if (status >= 400 && status < 500) {
      res_.sendFail(res, e.message, null, status);
    } else {
      res_.sendError(res, e.message, status);
    } 
  }
};