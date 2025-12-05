const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { ApiResponse } = require("../model/response/apiResponse");
const { filmSchema } = require("../validator/filmControllerValidator");
const { Film } = require("../model/entity/Film");
const {
  insertFilm,
  getFilms,
  softDeleteFilm,
  hardDeleteFilm,
} = require("../service/filmService");

async function addFilm(req, res) {
  const { error, value } = filmSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    throw new AppError({
      message: `Validation error: ${message}`,
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  const filmEntity = new Film({
    ...value,
  });

  await insertFilm(filmEntity);

  const payload = ApiResponse.success({
    message: "Film added successfully",
    data: filmEntity,
    statusCode: HttpStatusCode.CREATED,
  });

  return res.status(HttpStatusCode.CREATED).json(payload);
}

async function getFilm(req, res) {
  const query = qs.parse(req.query);
  const films = await getFilms(query);

  const payload = ApiResponse.success({
    message: "Film fetched successfully",
    data: films,
    statusCode: HttpStatusCode.OK,
  });

  return res.status(HttpStatusCode.OK).json(payload);
}

async function removeFilmSoft(req, res) {
  const { filmId } = req.params;

  await softDeleteFilm(filmId);

  const payload = ApiResponse.success({
    message: "Film removed successfully",
    data: null,
    statusCode: HttpStatusCode.OK,
  });

  return res.status(HttpStatusCode.OK).json(payload);
}

async function removeFilmHard(req, res) {
  const { filmId } = req.params;

  await hardDeleteFilm(filmId);

  const payload = ApiResponse.success({
    message: "Film removed successfully",
    data: null,
    statusCode: HttpStatusCode.OK,
  });

  return res.status(HttpStatusCode.OK).json(payload);
}

module.exports = { addFilm, getFilm, removeFilmSoft, removeFilmHard };
