import jwt from "jsonwebtoken";
import config from "../config";
import { User } from "../entity/User";

export let signToken = (user: User) => {
  if (config.jwtSecret) {
    let token = jwt.sign({ id: user.uuid }, config.jwtSecret, {
      expiresIn: config.jwtExpiresIn,
    });
    return token;
  }
};
