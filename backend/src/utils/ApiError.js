export default class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    // console.log("apiError", statusCode, message);
    this.status = statusCode;
    this.statusInfo = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.message = message;
    this.success = false;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
