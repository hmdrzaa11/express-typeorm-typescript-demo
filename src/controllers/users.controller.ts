import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../utils/ApiError";
import { parseValidationErrors } from "../utils/parseValidationErrors";

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let { name, email, password, passwordConfirm } = req.body;
    if (!password || !passwordConfirm) {
      return next(
        new ApiError("password and password confirm are required", 400)
      );
    }
    if (password !== passwordConfirm)
      return next(
        new ApiError("password and passwordConfirm do not match", 400)
      );

    let user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    let errors = await validate(user);
    if (errors.length) {
      let err = parseValidationErrors(errors);
      return next(err);
    }

    //we can save the user
    await user.save();
    res.status(201).json({
      status: "success",
      user,
    });
  }
);
