import dotenv from "dotenv";
dotenv.config();

export default {
  port: (process.env.PORT && parseInt(process.env.PORT)) || 8000,
  host: process.env.HOST || "localhost",
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  cookieExpires: process.env.COOKIE_EXPIRES_IN,
};
