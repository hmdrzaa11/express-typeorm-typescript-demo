import dotenv from "dotenv";
dotenv.config();

export default {
  port: (process.env.PORT && parseInt(process.env.PORT)) || 8000,
  host: process.env.HOST || "localhost",
};
