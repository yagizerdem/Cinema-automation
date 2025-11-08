const express = require("express");
const { router: authRouter } = require("./routes/authRoute");

const app = express();

app.use("/api/v1/auth", authRouter);

module.exports = { app };
