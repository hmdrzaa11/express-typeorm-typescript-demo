import { ValidationError } from "class-validator";
import { ApiError } from "./ApiError";

export const parseValidationErrors = (errors: ValidationError[]): ApiError => {
  let errorsArr: string[] = [];

  for (let error of errors) {
    if (error.constraints) {
      errorsArr.push(...Object.values(error.constraints));
    }
  }

  return new ApiError(errorsArr.join("\n"), 400);
};
