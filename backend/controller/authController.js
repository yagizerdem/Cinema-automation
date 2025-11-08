const { HttpStatusCode } = require("../enum/http-status-codes");
const { ApiResponse } = require("../model/response/apiResponse");
async function register(req, res) {
  console.log("hit register controller !");

  const payload = ApiResponse.success({
    message: "User registered successfully",
    data: null,
    statusCode: HttpStatusCode.CREATED,
  });

  return res.status(HttpStatusCode.CREATED).json(payload);
}

module.exports = { register };
