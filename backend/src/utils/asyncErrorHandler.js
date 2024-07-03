export default (requestHandler) => {
  return (req, res, next) => {
    requestHandler(req, res, next).catch((err) => next(err));

    // ------------------- x ------------------
    // try {
    //   await requestHandler(req, res, next);
    // } catch (error) {
    //   res.status(error.status).json({
    //     status: error.status || 500,
    //     statusInfo: error.statusInfo || "Error",
    //     response: error.response || "Internal Server Error",
    //   });
    // }
  };
};
