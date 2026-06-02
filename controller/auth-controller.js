const userService = require("../service/user-service");
const { ApiResponse } = require("../util/api-response");
const { HttpStatusCode } = require("../util/http-status-codes");

async function login(req, res) {
  console.log("Login request received with body:", req.body);
  res.send("Login successful");
}

async function register(req, res) {
  const body = req.body;
  await userService.registerUser(body);

  return res
    .status(HttpStatusCode.CREATED)
    .json(ApiResponse.created("User registered successfully"));
}

async function logout(req, res) {}

module.exports = {
  login,
  register,
  logout,
};
