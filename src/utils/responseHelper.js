const sendSuccess = (res, message, data = null, meta = null, statusCode = 200) => {
    const response = { status: 'success', message };
    if (data !== null) response.data = data;
    if (meta !== null) response.meta = meta;
    return res.status(statusCode).json(response);
};

const sendFail = (res, message, errors = null, statusCode = 400) => {
    const response = { status: 'fail', message };
    if (errors !== null) response.errors = errors;
    return res.status(statusCode).json(response);
};

const sendError = (res, message = 'Lỗi máy chủ nội bộ', statusCode = 500) => {
    return res.status(statusCode).json({
        status: 'error',
        message
    });
};

module.exports = { sendSuccess, sendFail, sendError };
