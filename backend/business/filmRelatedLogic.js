const { entityStatus } = require("../enum/entityStatus");
const { HttpStatusCode } = require("../enum/http-status-codes");
const { AppError } = require("../error/AppError");
const { Film } = require("../model/entity/Film");

/**
 * Ensures that no film exists with the given title.
 *
 * This function is typically used before creating a new film to enforce
 * unique film titles in the system. If a film with the same title already
 * exists (active or inactive), an AppError is thrown.
 *
 * @param {string} title - The film title to check.
 * @returns {Promise<void>}
 *
 * @throws {AppError}
 *    Thrown if a film with the specified title already exists.
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

/**
 * Ensures that no ACTIVE film exists with the given title.
 *
 * This is useful when reactivating or soft-creating records, where only
 * ACTIVE films are considered conflicting. If a film exists and is ACTIVE,
 * an AppError is thrown.
 *
 * @param {string} title - The film title to validate.
 * @returns {Promise<void>}
 *
 * @throws {AppError}
 *    Thrown if an ACTIVE film with the same title already exists.
 */

async function EnsureFilmNotActiveByTitle(title) {
  const existingFilm = await Film.findOne({ title });
  if (existingFilm && existingFilm.entityStatus === entityStatus.ACTIVE) {
    throw new AppError({
      message: "Film already in use",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }
}

/**
 * Ensures that a film exists AND is ACTIVE based on its ID.
 *
 * Useful before operations like soft-deleting, updating, or associating
 * other resources with the film. If the film does not exist or is not ACTIVE,
 * an AppError is thrown.
 *
 * @param {string} filmId - MongoDB ObjectId string of the film.
 * @returns {Promise<void>}
 *
 * @throws {AppError}
 *    Thrown when the film does not exist or is inactive.
 */

async function EnsureFilmExistAndActiveById(filmId) {
  const existingFilm = await Film.findOne({ _id: filmId });

  if (!existingFilm || existingFilm.entityStatus !== entityStatus.ACTIVE) {
    throw new AppError({
      message: "Film not found or inactive",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
}

/**
 * Ensures that a film exists in the database based on its ID.
 *
 * Typically used before performing a hard delete to avoid deleting
 * non-existing records. If no film exists with the given ID, an AppError
 * is thrown.
 *
 * @param {string} filmId - The film's MongoDB ObjectId string.
 * @returns {Promise<void>}
 *
 * @throws {AppError}
 *    Thrown when the film is not found in the database.
 */

async function EnsureFilmNotExistById(filmId) {
  const existingFilm = await Film.findOne({ _id: filmId });

  if (!existingFilm) {
    throw new AppError({
      message: "Film not found",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }
}

module.exports = {
  EnsureFilmNotExistByTitle,
  EnsureFilmNotActiveByTitle,
  EnsureFilmExistAndActiveById,
  EnsureFilmNotExistById,
};
