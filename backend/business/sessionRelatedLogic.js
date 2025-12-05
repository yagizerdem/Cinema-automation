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

module.exports = { isTimeSpanAvailable };
