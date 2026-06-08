const express = require("express");
const app = express();
const { router: authRouter } = require("./router/auth-router");
const { router: hallRouter } = require("./router/hall-router");
const { router: movieRouter } = require("./router/movie-router");
const { router: screeningRouter } = require("./router/screening-router");
const { router: ticketRouter } = require("./router/ticket-router");
const { router: paymentRouter } = require("./router/payment-router");
const { AppError } = require("./util/app-error");
const errorHandler = require("./controller/error-handler");
const { HttpStatusCode } = require("./util/http-status-codes");
const swaggerUi = require("swagger-ui-express");
const passport = require("passport");
require("./passport-strategy"); // load passport configuration
var cookieParser = require("cookie-parser");
const { swaggerSpec } = require("./swagger-spec");

app.set("query parser", "extended");

app.use(cookieParser());
app.use(passport.initialize());
app.use(express.json());

if (process.env.ENABLE_SWAGGER === "true") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/swagger.json", (req, res) => {
    res.json(swaggerSpec);
  });
}

app.use("/api/auth", authRouter);
app.use("/api/hall", hallRouter);
app.use("/api/movie", movieRouter);
app.use("/api/screening", screeningRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/payment", paymentRouter);
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
