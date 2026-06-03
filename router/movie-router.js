const express = require("express");
const router = express.Router();
const { createMovie, deleteMovie } = require("../controller/movie-controller");
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

module.exports = { router };
