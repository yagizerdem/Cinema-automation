const express = require("express");
const app = express();
const { router: authRouter } = require("./router/auth-router");
const { AppError } = require("./util/app-error");
const errorHandler = require("./controller/error-handler");

app.use(express.json());
app.use("/api/auth", authRouter);

app.use((req, res, next) => {
  next(
    new AppError({
      message: `This path ${req.originalUrl} isn't available`,
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    }),
  );
});

app.use(errorHandler);

module.exports = { app };
