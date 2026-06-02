const userService = require("../service/user-service");

async function login(req, res) {
  console.log("Login request received with body:", req.body);
  res.send("Login successful");
}

async function register(req, res) {
  const body = req.body;
  await userService.registerUser(body);
}

async function logout(req, res) {}

module.exports = {
  login,
  register,
  logout,
};
