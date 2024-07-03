export default class ApiError extends Error {
  constructor(status, statusInfo, response, stack = "") {
    super(response);
    // console.log("apiError", status, response);
    this.status = status || 500;
    // this.statusInfo = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.statusInfo = statusInfo || "error";
    this.response = response;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
