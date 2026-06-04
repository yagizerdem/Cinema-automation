const { HttpStatusCode } = require("../util/http-status-codes");
const { ApiResponse } = require("../util/api-response");
const screeningService = require("../service/screening-service");

async function createScreening(req, res) {
  const screeningData = req.body;
  const screening = await screeningService.createScreening(screeningData);
  res.status(HttpStatusCode.CREATED).json(
    ApiResponse.created({
      message: "Screening created successfully",
      data: screening,
    }),
  );
}

async function deleteScreening(req, res) {
  const { id } = req.params;
  const deletedScreening = await screeningService.deleteScreening(id);
  res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Screening deleted successfully",
      data: deletedScreening,
    }),
  );
}

async function getScreenings(req, res) {
  const queryString = req.query;
  const screenings = await screeningService.getScreenings(queryString);
  res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Screenings retrieved successfully",
      data: screenings,
    }),
  );
}

module.exports = { createScreening, deleteScreening, getScreenings };
