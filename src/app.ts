import "reflect-metadata";
import express from "express";
import config from "./config";
import connectDb from "./db/connect";
import usersRouter from "./routes/users.routes";
import errorController from "./controllers/errors.controller";

let app = express();

app.use(express.json());

app.use("/users", usersRouter);

//global error handler
app.use(errorController);

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
