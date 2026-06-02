const express = require("express");
const app = express();
const { router: authRouter } = require("./router/authRouter");

app.use(express.json());
app.use("/api/auth", authRouter);

module.exports = { app };
