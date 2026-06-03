const express = require("express");
const app = express();
const { router: authRouter } = require("./router/auth-router");
const { router: hallRouter } = require("./router/hall-router");
const { router: movieRouter } = require("./router/movie-router");
const { AppError } = require("./util/app-error");
const errorHandler = require("./controller/error-handler");
const { HttpStatusCode } = require("./util/http-status-codes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const passport = require("passport");
require("./passport-strategy"); // load passport configuration
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(passport.initialize());

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Cinema Automation API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./router/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/hall", hallRouter);
app.use("/api/movie", movieRouter);

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
