const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { Film } = require("../model/entity/Film");

/**
 * Checks if a film with the given title already exists in the database.
 *
 * @param {string} title - The film title to check for existence.
 * @returns {Promise<null>} Returns null if no film exists with this title.
 *
 * @throws {AppError} Throws an AppError if a film with the same title already exists.
 */

async function EnsureFilmNotExistByTitle(title) {
  const existingFilm = await Film.findOne({ title });
  if (existingFilm) {
    throw new AppError({
      message: "Film already in use",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

module.exports = { EnsureFilmNotExistByTitle };
