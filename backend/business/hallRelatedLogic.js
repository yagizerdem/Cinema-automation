const { entityStatus } = require("../enum/entityStatus");
const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { Hall } = require("../model/entity/Hall");

async function EnsureHallExistAndActiveById(hallId) {
  const existingHall = await Hall.findOne({ _id: hallId });

  if (!existingHall || existingHall.entityStatus !== entityStatus.ACTIVE) {
    throw new AppError({
      message: "Hall not found or inactive",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
}

module.exports = { EnsureHallExistAndActiveById };
