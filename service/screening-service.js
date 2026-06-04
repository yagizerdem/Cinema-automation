const { Screening } = require("../model/screening");
const { APIFeatures } = require("../util/api-features");
const hallService = require("./hall-service");
const movieService = require("./movie-service");
const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");

async function createScreening(screeningData) {
  const { hall, movie } = screeningData;

  await hallService.ensureHallExistById(hall);
  await movieService.ensureMovieExistById(movie);

  const screening = new Screening({
    ...screeningData,
  });

  await screening.save();
  return screening;
}

async function deleteScreening(screeningId) {
  const deletedScreening = await Screening.findByIdAndDelete(screeningId);
  return deletedScreening;
}

async function getScreenings(queryString) {
  const apiFeatures = new APIFeatures(Screening.find(), queryString);
  const query = apiFeatures.filter().sort().limitFields().paginate().query;
  const screenings = await query;
  return screenings;
}

async function ensureScreeningExistById(screeningId) {
  const screening = await Screening.findById(screeningId);
  if (!screening) {
    throw new AppError({
      message: "Screening not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return screening;
}

module.exports = {
  createScreening,
  deleteScreening,
  getScreenings,
  ensureScreeningExistById,
};
