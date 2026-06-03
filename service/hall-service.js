const { Hall, Seat } = require("../model/hall");
const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");

async function createHall(hallData) {
  const newHall = new Hall({ ...hallData });
  await newHall.save();
  return newHall;
}

async function deleteHall(hallId) {
  const deletedHall = await Hall.findByIdAndDelete(hallId);
  return deletedHall;
}

async function ensureHallExistById(hallId) {
  const hall = await Hall.findById(hallId);
  if (!hall) {
    throw new AppError({
      message: "Hall not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return hall;
}

async function ensureSeatExist(hallId, row, number) {
  const hall = await ensureHallExistById(hallId);
  const seat = hall.seats.find((s) => s.row === row && s.number === number);
  if (!seat) {
    throw new AppError({
      message: "Seat not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
  return seat;
}

async function ensureSeatNotExist(hallId, row, number) {
  const hall = await ensureHallExistById(hallId);
  const seat = hall.seats.find((s) => s.row === row && s.number === number);
  if (seat) {
    throw new AppError({
      message: "Seat already exists",
      statusCode: HttpStatusCode.CONFLICT,
      isOperational: true,
    });
  }
}

async function createSeat(hallId, seatData) {
  const hallFromDb = await ensureHallExistById(hallId);
  await ensureSeatNotExist(hallId, seatData.row, seatData.number);
  const newSeat = new Seat({ ...seatData });
  hallFromDb.seats.push(newSeat);
  await hallFromDb.save();
  return newSeat;
}

async function deleteSeat(hallId, seatId) {
  const hallFromDb = await ensureHallExistById(hallId);
  const deletedSeat = await Seat.findByIdAndDelete(seatId);
  if (deletedSeat) {
    hallFromDb.seats = hallFromDb.seats.filter(
      (seat) => seat._id.toString() !== seatId,
    );
    await hallFromDb.save();
  }
  return deletedSeat;
}

module.exports = {
  createHall,
  deleteHall,
  ensureHallExistById,
  createSeat,
  deleteSeat,
};
