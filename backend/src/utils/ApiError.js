export default class ApiError extends Error {
  constructor(
    status,
    statusInfo,
    message = "Something went wrong",
    stack = ""
  ) {
    super(message);

    // console.log("apiError", status, message);
    this.status = status || 500;
    // this.statusInfo = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.statusInfo = statusInfo || "error";
    this.message = message;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
