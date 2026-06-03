const { Movie } = require("../model/movie");
const { APIFeatures } = require("../util/api-features");

async function createMovie(movieData) {
  const movie = new Movie({
    ...movieData,
  });

  await movie.save();
  return movie;
}

async function deleteMovie(movieId) {
  const deletedMovie = await Movie.findByIdAndDelete(movieId);
  return deletedMovie;
}

async function ensureMovieExistById(movieId) {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw new AppError({
      message: "Movie not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return movie;
}

async function ensureMovieExistByTitle(title) {
  const movie = await Movie.findOne({ title });
  if (!movie) {
    throw new AppError({
      message: "Movie not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return movie;
}

async function ensureMovieNotExistByTitle(title) {
  const movie = await Movie.findOne({ title });
  if (movie) {
    throw new AppError({
      message: "Movie already exists",
      statusCode: HttpStatusCode.CONFLICT,
      isOperational: true,
    });
  }
}

async function getMovies(queryString) {
  const apiFeatures = new APIFeatures(Movie.find(), queryString);
  const query = apiFeatures.filter().sort().limitFields().paginate().query;
  const movies = await query;
  return movies;
}

module.exports = {
  createMovie,
  deleteMovie,
  ensureMovieExistById,
  ensureMovieExistByTitle,
  ensureMovieNotExistByTitle,
  getMovies,
};
