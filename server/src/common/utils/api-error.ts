class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Object.setPrototypeOf(this, ApiError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad request") {
    return new ApiError(400, message);
  }
  static notFound(message = "NotFound") {
    return new ApiError(404, message);
  }
  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }
}

export default ApiError;
