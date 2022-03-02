const {
    Response,
    ResponseError
} = require('./common');

module.exports = (err, req, res, next) => {
    const error = new ResponseError({
        status: err.status || 500,
        msg: err.msg || err.message || 'Something Has Gone Wrong.',
        reason: err.reason || err.stack || 'Unable To Handle That Request At This Time',
        url: req.originalUrl,
        ip: req.ip,
        validationErrors: err.validationErrors
    })

    res.status(error.status);
    res.json(new Response({
        status: false,
        error
    }))
}