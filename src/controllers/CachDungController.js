const CachDungService = require('../services/CachDungService');
const res_ = require('../utils/responseHelper');

exports.GetAll = async (req, res) => {
    try {
        const data = await CachDungService.GetAll();
        res_.sendSuccess(res, 'Lấy danh sách cách dùng thành công', data, null, 200);
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
        const data = await CachDungService.GetById(req.params.id);
        res_.sendSuccess(res, 'Lấy cách dùng thành công', data, null, 200);
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
        const data = await CachDungService.Create(req.body);
        res_.sendSuccess(res, 'Tạo cách dùng thành công', data, null, 201);
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
        const data = await CachDungService.Update(req.params.id, req.body);
        res_.sendSuccess(res, 'Cập nhật cách dùng thành công', data, null, 200);
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
        await CachDungService.Delete(req.params.id);
        res_.sendSuccess(res, 'Xóa cách dùng thành công', null, null, 200);
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