const errorHandler = (err, req, res, next) => {
  // console.log("errorHandler", err);

  // err.status = err.status || 500;
  err.status = err.response ? err.status : 500;
  err.response = err.response || "Internal Server Error";
  err.statusInfo = err.statusInfo || "error";
  res.status(err.status).json({
    status: err.status,
    statusInfo: err.statusInfo,
    response: err.response,
  });
};
export default errorHandler;
