const { EnsureFilmNotExistByTitle } = require("../business/filmRelatedLogic");

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

module.exports = { insertFilm };
