class ApiError extends Error {
  public statusCode: number;
  public status: string;
  public isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  static unauthorized(message: string): ApiError {
    return new ApiError(401, message);
  }

  static forbidden(message: string): ApiError {
    return new ApiError(403, message);
  }

  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }

  static internalServerError(message: string): ApiError {
    return new ApiError(500, message, false);
  }

  serializeError() {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

export default ApiError;
