import { Request, Response } from "express";
import config from "../config";
import { User } from "../entity/User";
import { signToken } from "./signToken";

export let sendToken = (
  user: User,
  req: Request,
  res: Response,
  statusCode: number
) => {
  let token = signToken(user);
  if (token && config.cookieExpires) {
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + parseInt(config.cookieExpires)),
        httpOnly: true,
        secure:
          (req.secure || req.headers["x-forwarded-proto"] === "https") && true,
      })
      .status(statusCode)
      .send({
        token,
        user,
      });
  }
};
