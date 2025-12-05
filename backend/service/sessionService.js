const {
  EnsureFilmExistAndActiveById,
} = require("../business/filmRelatedLogic");
const {
  EnsureHallExistAndActiveById,
} = require("../business/HallRelatedLogic");
const {
  isTimeSpanAvailable,
  EnsureSessionExistAndActiveById,
  EnsureSessionExistById,
} = require("../business/sessionRelatedLogic");
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

async function removeSessionSoft(sessionId) {
  const session = await EnsureSessionExistAndActiveById(sessionId);
  session.entityStatus = entityStatus.DELETED;
  await session.save();
  return session;
}

async function removeSessionHard(sessionId) {
  const session = await EnsureSessionExistById(sessionId);
  await Session.deleteOne({ _id: sessionId });
  return session;
}

module.exports = {
  insertSession,
  getSessions,
  removeSessionSoft,
  removeSessionHard,
};
