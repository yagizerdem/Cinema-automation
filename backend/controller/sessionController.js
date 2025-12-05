const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { ApiResponse } = require("../model/response/apiResponse");
const { sessionSchema } = require("../validator/sessionControllerValidator");
const {
  insertSession,
  getSessions: getSessionsService,
} = require("../service/sessionService");
var qs = require("qs");

async function addSession(req, res) {
  const { error, value } = sessionSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new AppError({
      message: `Validation error: ${message}`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const session = await insertSession({ ...value });

  const payload = ApiResponse.success({
    message: "Session added successfully",
    data: session,
    statusCode: HttpStatusCode.CREATED,
  });

  res.status(HttpStatusCode.CREATED).json(payload);
}

async function getSessions(req, res) {
  const query = qs.parse(req.query);
  console.log(query);

  const sessions = await getSessionsService(query);

  const payload = ApiResponse.success({
    message: "Sessions fetched successfully",
    data: sessions,
    statusCode: HttpStatusCode.OK,
  });

  res.status(HttpStatusCode.OK).json(payload);
}

async function removeSessionSoft(req, res) {
  const payload = ApiResponse.success({
    message: "Session removed successfully",
    data: null,
    statusCode: HttpStatusCode.OK,
  });

  res.status(HttpStatusCode.OK).json(payload);
}

async function removeSessionHard(req, res) {
  const payload = ApiResponse.success({
    message: "Session removed successfully",
    data: null,
    statusCode: HttpStatusCode.OK,
  });

  res.status(HttpStatusCode.OK).json(payload);
}

module.exports = {
  addSession,
  getSessions,
  removeSessionHard,
  removeSessionSoft,
};
