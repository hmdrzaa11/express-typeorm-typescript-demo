import { NextFunction, Request, Response } from "express";

type RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export const catchAsync = (handler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch((err) => next(err));
  };
};
