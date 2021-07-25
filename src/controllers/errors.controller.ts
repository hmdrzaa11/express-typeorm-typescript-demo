import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
export default (
  err: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};
