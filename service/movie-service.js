const { Movie } = require("../model/movie");

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

module.exports = {
  createMovie,
  deleteMovie,
  ensureMovieExistById,
  ensureMovieExistByTitle,
  ensureMovieNotExistByTitle,
};
