export default class ApiError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, ApiError.prototype); // для корректной поддержки instanceof
  }

  static badRequest(message: string): ApiError {
    return new ApiError(404, message);
  }

  static internal(message: string): ApiError {
    return new ApiError(500, message);
  }

  static forbidden(message: string): ApiError {
    return new ApiError(403, message);
  }
}
