const express = require("express");
const { router: authRouter } = require("./routes/authRoute");
const { router: filmRouter } = require("./routes/filmRoute");
const { globalErrorHandler } = require("./middleware/globalErrorHandler");
const passportJwtConfig = require("./config/passport/jwtConfig");
const passport = require("passport");
var cookieParser = require("cookie-parser");

const app = express();
app.use(express.json()); // parse JSON request bodies
app.use(cookieParser()); // parse cookies

app.use(passport.initialize());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/film", filmRouter);

// handle global errors
app.use(globalErrorHandler);

module.exports = { app };
