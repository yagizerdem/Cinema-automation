const express = require("express");
const router = express.Router();
const {
  createMovie,
  deleteMovie,
  getMovies,
} = require("../controller/movie-controller");
const asyncHandler = require("../util/async-handler");
const { allowedRoles } = require("../middleware/auth-middleware");
const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const { getMovieValidator } = require("../validator/movie-validator");

/**
 * @swagger
 * /api/movie/create:
 *   post:
 *     summary: Create a new movie
 *     tags:
 *       - Movie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - durationMinute
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Interstellar"
 *               durationMinute:
 *                 type: number
 *                 example: 169
 *               description:
 *                 type: string
 *                 example: "A science fiction movie."
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Movie created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "685f8f1d4b6e9a1234567890"
 *                 title:
 *                   type: string
 *                   example: "Interstellar"
 *                 durationMinute:
 *                   type: number
 *                   example: 169
 *                 description:
 *                   type: string
 *                   example: "A science fiction movie."
 *                 isActive:
 *                   type: boolean
 *                   example: true
 */

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(validateReqBody(getMovieValidator())),
  asyncHandler(createMovie),
);

/**
 * @swagger
 * /api/movie/delete/{id}:
 *   delete:
 *     summary: Delete a movie
 *     tags:
 *       - Movie
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the movie to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 title:
 *                   type: string
 *                   example: "Interstellar"
 *                 durationMinute:
 *                   type: number
 *                   example: 169
 *                 description:
 *                   type: string
 *                   example: "A science fiction movie."
 *                 isActive:
 *                   type: boolean
 *                   example: true
 */

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(deleteMovie),
);

/**
 * @swagger
 * /api/movie/get-movies:
 *   get:
 *     summary: Get movies
 *     tags:
 *       - Movie
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         description: Filter movies by exact title
 *         schema:
 *           type: string
 *         example: "Interstellar"
 *       - name: durationMinute[gte]
 *         in: query
 *         required: false
 *         description: Filter movies with duration greater than or equal to value
 *         schema:
 *           type: number
 *         example: 120
 *       - name: durationMinute[gt]
 *         in: query
 *         required: false
 *         description: Filter movies with duration greater than value
 *         schema:
 *           type: number
 *         example: 120
 *       - name: durationMinute[lte]
 *         in: query
 *         required: false
 *         description: Filter movies with duration less than or equal to value
 *         schema:
 *           type: number
 *         example: 180
 *       - name: durationMinute[lt]
 *         in: query
 *         required: false
 *         description: Filter movies with duration less than value
 *         schema:
 *           type: number
 *         example: 180
 *       - name: isActive
 *         in: query
 *         required: false
 *         description: Filter movies by active status
 *         schema:
 *           type: boolean
 *         example: true
 *       - name: sort
 *         in: query
 *         required: false
 *         description: Comma-separated fields to sort by
 *         schema:
 *           type: string
 *         example: "durationMinute,title"
 *       - name: sortAsc
 *         in: query
 *         required: false
 *         description: If provided, sort ascending. If omitted, sort descending.
 *         schema:
 *           type: boolean
 *         example: true
 *       - name: fields
 *         in: query
 *         required: false
 *         description: Comma-separated fields to return
 *         schema:
 *           type: string
 *         example: "title,durationMinute,isActive"
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         schema:
 *           type: number
 *         example: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Number of movies per page
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: Movies fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "685f8f1d4b6e9a1234567890"
 *                   title:
 *                     type: string
 *                     example: "Interstellar"
 *                   durationMinute:
 *                     type: number
 *                     example: 169
 *                   description:
 *                     type: string
 *                     example: "A science fiction movie."
 *                   isActive:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-06-03T17:00:00.000Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-06-03T17:00:00.000Z"
 */

router.get(
  "/get-movies",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(getMovies),
);

module.exports = { router };
