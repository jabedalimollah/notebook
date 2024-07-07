const errorHandler = (err, req, res, next) => {
  // console.log("errorHandler", err);

  // err.status = err.status || 500;
  err.status = err.message ? (err.status ? err.status : 500) : 500;
  err.message = err.message || "Internal Server Error";
  err.statusInfo = err.statusInfo || "error";
  // err.data = err.data || null;
  res.status(err.status).json({
    status: err.status,
    statusInfo: err.statusInfo,
    message: err.message,
    // data: err.data,
    data: null,
  });
};
export default errorHandler;
