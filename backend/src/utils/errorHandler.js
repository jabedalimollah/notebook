const errorHandler = (err, req, res, next) => {
  //   console.log("errorHandler", err);
  err.statusCode = err.status || 500;
  err.message = err.message || "Internal Server Error";
  err.statusInfo = err.statusInfo || "error";
  res.status(err.statusCode).json({
    status: err.statusCode,
    statusInfo: err.statusInfo,
    message: err.message,
  });
};
export default errorHandler;
