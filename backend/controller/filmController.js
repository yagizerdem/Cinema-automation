const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { ApiResponse } = require("../model/response/apiResponse");

async function addFilm(req, res) {
  const payload = ApiResponse.success({
    message: "Film added successfully",
    data: null,
    statusCode: HttpStatusCode.CREATED,
  });

  return res.status(HttpStatusCode.CREATED).json(payload);
}

async function getFilm(req, res) {
  const payload = ApiResponse.success({
    message: "Film fetched successfully",
    data: null,
    statusCode: HttpStatusCode.OK,
  });

  return res.status(HttpStatusCode.OK).json(payload);
}

async function removeFilm(req, res) {
  const payload = ApiResponse.success({
    message: "Film removed successfully",
    data: null,
    statusCode: HttpStatusCode.OK,
  });

  return res.status(HttpStatusCode.OK).json(payload);
}

module.exports = { addFilm, getFilm, removeFilm };
