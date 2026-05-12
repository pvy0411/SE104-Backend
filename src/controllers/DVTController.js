const DVTService = require('../services/DVTService');
const res_ = require('../utils/responseHelper');

exports.GetAll = async (req, res) => {
    try {
        const data = await DVTService.GetAll();
        res_.sendSuccess(res, 'Lấy danh sách đơn vị tính thành công', data, null, 200);
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

exports.GetById = async (req, res) => {
    try {
        const data = await DVTService.GetById(req.params.id);
        res_.sendSuccess(res, 'Lấy đơn vị tính thành công', data, null, 200);
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

exports.Create = async (req, res) => {
    try {
        const data = await DVTService.Create(req.body);
        res_.sendSuccess(res, 'Tạo đơn vị tính thành công', data, null, 201);
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

exports.Update = async (req, res) => {
    try {
        const data = await DVTService.Update(req.params.id, req.body);
        res_.sendSuccess(res, 'Cập nhật đơn vị tính thành công', data, null, 200);
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

exports.Delete = async (req, res) => {
    try {
        await DVTService.Delete(req.params.id);
        res_.sendSuccess(res, 'Xóa đơn vị tính thành công', null, null, 200);
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