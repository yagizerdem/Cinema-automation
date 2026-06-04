const { ApiResponse } = require("../util/api-response");
const { HttpStatusCode } = require("../util/http-status-codes");
const ticketService = require("../service/ticket-service");

async function buyTicketWebCredit(req, res) {
  const user = req.user;
  const ticketData = req.body;
  await ticketService.buyTicketWebCredit(user._id, ticketData);

  res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      message: "Ticket bought successfully",
      data: null,
    }),
  );
}

module.exports = { buyTicketWebCredit };
