const { ApiResponse } = require("../util/api-response");
const { HttpStatusCode } = require("../util/http-status-codes");
const hallService = require("../service/hall-service");

async function createHall(req, res) {
  const body = req.body;
  const hall = await hallService.createHall(body);

  res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      message: "Hall created successfully",
      data: hall,
    }),
  );
}

async function deleteHall(req, res) {
  const { id } = req.params;
  const hall = await hallService.deleteHall(id);

  res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Hall deleted successfully",
      data: hall,
    }),
  );
}

module.exports = {
  createHall,
  deleteHall,
};
