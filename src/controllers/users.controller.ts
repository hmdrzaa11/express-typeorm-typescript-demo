import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { validate } from "class-validator";
import { User } from "../entity/User";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../utils/ApiError";
import { parseValidationErrors } from "../utils/parseValidationErrors";
import { sendToken } from "../utils/sendToken";

interface DecodedJWt extends JwtPayload {
  id: string;
}

//********************Signup***************************** */

export const signup = catchAsync(async (req, res, next) => {
  let { name, email, password, passwordConfirm } = req.body;
  if (!password || !passwordConfirm) {
    return next(
      new ApiError("password and password confirm are required", 400)
    );
  }
  if (password !== passwordConfirm)
    return next(new ApiError("password and passwordConfirm do not match", 400));

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
  sendToken(user, req, res, 201);
});

//********************SignIn***************************** */

export let signin = catchAsync(async (req, res, next) => {
  let { email, password } = req.body;
  //check to see if user provided the email and password
  if (!email || !password)
    return next(new ApiError("password and email are required", 400));
  //find user by email
  let user = await User.findOne({ email }, { select: ["password", "uuid"] });
  if (!user) return next(new ApiError("invalid  email or password", 404));
  //we call compare method on the instance

  let isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new ApiError("invalid  email or password", 404));

  //everything is good lets login users
  sendToken(user, req, res, 200);
});

export let protectedRoutes = catchAsync(async (req, res, next) => {
  let token: string | undefined = undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token)
    return next(new ApiError("unauthorized : please login to get access", 402));

  let decode = <DecodedJWt>jwt.verify(token, config.jwtSecret!);
  let user = await User.findOneOrFail({ uuid: decode.id });

  let isPasswordRecentlyChanged = user.isPasswordRecentlyChanged(decode.iat!);
  if (isPasswordRecentlyChanged)
    return next(
      new ApiError(
        "unauthorized : password changed recently please login again",
        402
      )
    );
  req.user = user;

  next();
});

export let updatePassword = catchAsync(async (req, res, next) => {
  let user = await User.findOneOrFail({
    uuid: "36b8016e-6ba0-47ff-9a1f-f111c241345b",
  });
  user.passwordChangedAt = new Date();
  await user.save();
  res.send({
    user,
  });
});
