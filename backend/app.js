const express = require("express");
const { router: authRouter } = require("./routes/authRoute");

const app = express();
app.use(express.json()); // parse JSON request bodies

app.use("/api/v1/auth", authRouter);

module.exports = { app };
