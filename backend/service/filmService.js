const {
  EnsureFilmNotExistByTitle,
  EnsureFilmExistAndActiveById,
  EnsureFilmNotExistById,
} = require("../business/filmRelatedLogic");
const { entityStatus } = require("../enum/entityStatus");
const { Film } = require("../model/entity/Film");
const { ApiFeatures } = require("../utils/ApiFeatures");

/**
 * Inserts a new Film document into the database after validating uniqueness.
 *
 * This function checks whether another film with the same title already exists.
 * If the title is unique, the provided Film instance is saved to the database.
 *
 * @param {import("../model/entity/Film").Film} film
 *    A Mongoose Film document instance to be inserted.
 *
 * @returns {Promise<import("../model/entity/Film").Film>}
 *    Returns the saved Film document.
 *
 * @throws {AppError}
 *    Throws an AppError if a film with the same title already exists.
 */
async function insertFilm(film) {
  await EnsureFilmNotExistByTitle(film.title);
  await film.save();
  return film;
}

/**
 * Retrieves a filtered, sorted, limited, and paginated list of active films.
 *
 * Applies ApiFeatures (substring match, sorting, field limiting, pagination)
 * on top of a base MongoDB query that fetches only ACTIVE films.
 *
 * @param {object} [query={}]
 *    Query parameters from request (page, limit, sortAsc, sortDesc, fields, filters, etc.).
 *
 * @returns {Promise<import("../model/entity/Film").Film[]>}
 *    Returns an array of Film documents that match the filters.
 */

async function getFilms(query = {}) {
  const apiFeatures = new ApiFeatures(
    Film.find({ entityStatus: entityStatus.ACTIVE }),
    query
  );

  const films = await apiFeatures
    .contains()
    .sortAscending()
    .sortDescending()
    .limitFields()
    .paginate().query;

  return films;
}

/**
 * Soft-deletes a film by marking its `entityStatus` as INACTIVE.
 *
 * This operation does NOT remove the film from the database.
 * It first checks if the film exists AND is currently ACTIVE.
 *
 * @param {string} filmId
 *    The MongoDB ObjectId string of the film to soft delete.
 *
 * @returns {Promise<void>}
 *
 * @throws {AppError}
 *    Throws if the film does not exist or is already inactive.
 */

async function softDeleteFilm(filmId) {
  await EnsureFilmExistAndActiveById(filmId);

  await Film.updateOne({ _id: filmId }, { entityStatus: entityStatus.DELETED });
}

/**
 * Permanently removes a film from the database.
 *
 * This operation performs a physical delete (MongoDB remove),
 * and only executes if the film is confirmed to be non-existent or inactive.
 *
 * @param {string} filmId
 *    The MongoDB ObjectId string of the film to permanently delete.
 *
 * @returns {Promise<void>}
 *
 * @throws {AppError}
 *    Throws if the film still exists or is active.
 */

async function hardDeleteFilm(filmId) {
  await EnsureFilmNotExistById(filmId);
  await Film.deleteOne({ _id: filmId });
}

module.exports = { insertFilm, getFilms, softDeleteFilm, hardDeleteFilm };
