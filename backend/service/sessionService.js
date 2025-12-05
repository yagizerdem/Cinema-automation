const {
  EnsureFilmExistAndActiveById,
} = require("../business/filmRelatedLogic");
const {
  EnsureHallExistAndActiveById,
} = require("../business/HallRelatedLogic");
const { isTimeSpanAvailable } = require("../business/sessionRelatedLogic");
const { entityStatus } = require("../enum/entityStatus");
const { Session } = require("../model/entity/Session");
const { ApiFeatures } = require("../utils/ApiFeatures");

async function insertSession({
  filmId,
  hallId,
  startTime,
  endTime,
  basePrice,
  isSpecial,
}) {
  console.log("Inserting session:", {
    filmId,
    hallId,
    startTime,
    endTime,
    basePrice,
    isSpecial,
  });

  // force business logic
  await EnsureFilmExistAndActiveById(filmId);
  await EnsureHallExistAndActiveById(hallId);
  await isTimeSpanAvailable({ hallId, startTime, endTime });

  const newSession = new Session({
    film: filmId,
    hall: hallId,
    startTime,
    endTime,
    basePrice,
    isSpecial,
    entityStatus: entityStatus.ACTIVE,
  });

  await newSession.save();
  return newSession;
}

async function getSessions(query = {}) {
  const apiFeatures = new ApiFeatures(
    Session.find({ entityStatus: entityStatus.ACTIVE }),
    query
  );

  const films = await apiFeatures
    .filter()
    .sortAscending()
    .sortDescending()
    .limitFields()
    .paginate().query;

  return films;
}

module.exports = { insertSession, getSessions };
