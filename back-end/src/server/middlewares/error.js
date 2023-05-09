const errorMiddleware = (error, _req, res, _next) => {
    const status = error.status || 500;
    const message = error.message || 'Internal Server Error';
  
    return res.status(status).json({ message });
  };
  
  module.exports = errorMiddleware;