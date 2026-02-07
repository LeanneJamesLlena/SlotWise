class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  errors?: unknown;

  constructor(message: string, statusCode: number, errors?: unknown, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }

  // add factory methods later for common errors
  static badRequest(message: string, errors?: unknown): AppError {
    return new AppError(message, 400, errors);
  }

  static notFound(message: string, errors?: unknown): AppError {
    return new AppError(message, 404, errors);
  }
}

export default AppError;
