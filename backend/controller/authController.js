const { HttpStatusCode } = require("../enum/http-status-codes");
const { ApiResponse } = require("../model/response/apiResponse");
const { registerSchema } = require("../validator/authControllerValidator");
async function register(req, res) {
  const { error, value } = registerSchema.validate(req.body);

  console.log(error);

  const payload = ApiResponse.success({
    message: "User registered successfully",
    data: null,
    statusCode: HttpStatusCode.CREATED,
  });

  return res.status(HttpStatusCode.CREATED).json(payload);
}

module.exports = { register };
