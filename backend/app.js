const express = require("express");
const { router: authRouter } = require("./routes/authRoute");
const { globalErrorHandler } = require("./middleware/globalErrorHandler");

const app = express();
app.use(express.json()); // parse JSON request bodies

app.use("/api/v1/auth", authRouter);

// handle global errors
app.use(globalErrorHandler);

module.exports = { app };
