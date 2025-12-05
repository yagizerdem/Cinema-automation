const { entityStatus } = require("../enum/entityStatus");
const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { Session } = require("../model/entity/Session");

async function isTimeSpanAvailable({ hallId, startTime, endTime }) {
  // Fetch existing sessions for the hall

  const existingSession = await Session.findOne({
    hall: hallId,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  if (existingSession) {
    throw new AppError({
      message: "The time span overlaps with an existing session.",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

async function EnsureSessionExistAndActiveById(sessionId) {
  const existingSession = await Session.findOne({ _id: sessionId });

  if (
    !existingSession ||
    existingSession.entityStatus !== entityStatus.ACTIVE
  ) {
    throw new AppError({
      message: "Session not found or inactive",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return existingSession;
}

async function EnsureSessionExistById(sessionId) {
  const existingSession = await Session.findOne({ _id: sessionId });

  if (!existingSession) {
    throw new AppError({
      message: "Session not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  return existingSession;
}

module.exports = {
  isTimeSpanAvailable,
  EnsureSessionExistAndActiveById,
  EnsureSessionExistById,
};
