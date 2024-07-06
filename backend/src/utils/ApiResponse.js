class ApiResponse {
  constructor(
    status,
    data,
    token = null,
    statusInfo = "success",
    message = "success"
  ) {
    this.status = status;
    this.data = data;
    this.token = token;
    this.statusInfo = statusInfo;
    this.message = message;
  }
}
export default ApiResponse;
