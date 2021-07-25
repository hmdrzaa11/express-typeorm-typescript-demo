import "reflect-metadata";
import express from "express";
import config from "./config";
import connectDb from "./db/connect";

let app = express();

connectDb()
  .then(() => {
    app.listen(config.port, config.host, () =>
      console.log("server on port ", config.port)
    );
  })
  .catch((er) => {
    console.error(er);
    process.exit(1);
  });
