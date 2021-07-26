import config from "../config";
import { ErrorRequestHandler, Response } from "express";
import { ApiError } from "../utils/ApiError";

const errorsInDev = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    message: err.message,
    status: err.status,
    err,
  });
};

const duplicatedValues = (err: any, res: Response) => {
  let [field, message] = err.detail.match(/\(([^\)]+)\)/g);
  let error = new ApiError(`${field} : "${message}" already exists`, 400);
  errorsInProd(error, res);
};
const errorsInProd = (err: ApiError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const handleEntityNotFound = (err: any, res: Response) => {
  let error = new ApiError("entity notfound", 404);
  errorsInProd(error, res);
};

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //handle in development
  if (config.env && config.env === "development") {
    errorsInDev(err, res);
  } else {
    //production

    //custom errors
    if (err.isOperational) {
      errorsInProd(err, res);
    }

    //duplicated error
    if (err.code === "23505") {
      duplicatedValues(err, res);
    }

    //entity notfound

    if (err.name === "EntityNotFound") {
      handleEntityNotFound(err, res);
    }

    //server error
    errorsInProd(err, res);
  }
};
