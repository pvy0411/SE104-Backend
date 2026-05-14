<<<<<<< HEAD
const sendSuccess = (res, message, data = null, meta = null, statusCode = 200) => {
=======
const SendSuccess = (res, message, data = null, meta = null, statusCode = 200) => {
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
    const response = { status: 'success', message };
    if (data !== null) response.data = data;
    if (meta !== null) response.meta = meta;
    return res.status(statusCode).json(response);
};

<<<<<<< HEAD
const sendFail = (res, message, errors = null, statusCode = 400) => {
=======
const SendFail = (res, message, errors = null, statusCode = 400) => {
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
    const response = { status: 'fail', message };
    if (errors !== null) response.errors = errors;
    return res.status(statusCode).json(response);
};

<<<<<<< HEAD
const sendError = (res, message = 'Lỗi máy chủ nội bộ', statusCode = 500) => {
=======
const SendError = (res, message = 'Lỗi máy chủ nội bộ', statusCode = 500) => {
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
    return res.status(statusCode).json({
        status: 'error',
        message
    });
};

<<<<<<< HEAD
module.exports = { sendSuccess, sendFail, sendError };
=======
module.exports = { SendSuccess, SendFail, SendError };
>>>>>>> 7e73e0d6567e5ab73422d4a1c3aee3fd96619f0d
