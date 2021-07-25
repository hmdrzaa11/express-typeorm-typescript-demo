export default class ApiError extends Error {
  statusCode: number;
  status: "failed" | "error";
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "failed" : "error";
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    Object.setPrototypeOf(this, ApiError.prototype); // do this to make the 'instanceof' check workable we point the
    // __proto__ to the AppError.prototype
  }
}
