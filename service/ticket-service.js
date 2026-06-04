const { Screening } = require("../model/screening");
const { APIFeatures } = require("../util/api-features");
const hallService = require("./hall-service");
const movieService = require("./movie-service");
const userService = require("./user-service");
const screeningService = require("./screening-service");
const { AppError } = require("../util/app-error");
const { HttpStatusCode } = require("../util/http-status-codes");
const { Ticket } = require("../model/ticket");
const { calculatePaymentAmount } = require("./payment-service");
const { default: mongoose } = require("mongoose");
const { User } = require("../model/user");

async function buyTicketWebCredit(customerId, ticketData) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const customerFromDb = await userService.ensureUserExistById(
      customerId,
      session,
    );

    const { screening: screeningId, seat } = ticketData;
    const { row, number } = seat;

    const screening = await screeningService.ensureScreeningExistById(
      screeningId,
      session,
    );

    const hall = await hallService.ensureHallExistById(screening.hall, session);

    const seatExists = hall.seats.some(
      (s) => s.row === row && s.number === number,
    );

    if (!seatExists) {
      throw new AppError({
        message: "Seat does not exist in the hall",
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      });
    }

    const amount = calculatePaymentAmount(customerFromDb, screening);

    const updatedCustomer = await User.findOneAndUpdate(
      {
        _id: customerId,
        credit: { $gte: amount },
      },
      {
        $inc: { credit: -amount },
      },
      {
        new: true,
        session,
      },
    );

    if (!updatedCustomer) {
      throw new AppError({
        message: "Not enough credit",
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      });
    }

    const [ticket] = await Ticket.create(
      [
        {
          screening: screeningId,
          buyer: customerId,
          seat: { row, number },
          salesChannel: "WEB",
          ticketType: "FULL",
          price: amount,
          status: "SOLD",
        },
      ],
      { session },
    );

    await session.commitTransaction();
    return ticket;
  } catch (err) {
    await session.abortTransaction();

    if (err.code === 11000) {
      throw new AppError({
        message: "Seat is already sold for this screening",
        statusCode: HttpStatusCode.BAD_REQUEST,
        isOperational: true,
      });
    }

    throw err;
  } finally {
    await session.endSession();
  }
}

module.exports = {
  buyTicketWebCredit,
};
