const { ApiResponse } = require("../util/api-response");
const { HttpStatusCode } = require("../util/http-status-codes");
const movieService = require("../service/movie-service");

async function createMovie(req, res) {
  const movieFromDb = await movieService.createMovie(req.body);
  return res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      message: "Movie created successfully",
      data: movieFromDb,
    }),
  );
}

async function deleteMovie(req, res) {
  const movieFromDb = await movieService.deleteMovie(req.params.id);
  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Movie deleted successfully",
      data: movieFromDb,
    }),
  );
}

module.exports = { createMovie, deleteMovie };
