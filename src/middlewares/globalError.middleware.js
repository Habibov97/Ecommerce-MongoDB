const config = require('../config');

const sendErrorDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.log('ERRROORRR 💥', err);
    return res.status(500).json({ status: 'error', message: 'Something went wrong' });
  }
};

const globalErrorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (config.nodeENV === 'development') {
    sendErrorDev(err, res);
  } else if (config.nodeENV === 'production') {
    sendErrorProd(err, res);
  }
};

module.exports = globalErrorMiddleware;
