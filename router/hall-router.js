const express = require("express");
const router = express.Router();
const {
  createHall,
  deleteHall,
  createSeat,
  deleteSeat,
} = require("../controller/hall-controller");
const asyncHandler = require("../util/async-handler");
const { allowedRoles } = require("../middleware/auth-middleware");
const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const {
  getHallValidator,
  getSeatValidator,
} = require("../validator/hall-validator");

/**
 * @swagger
 * /api/hall/create:
 *   post:
 *     summary: Create a new hall
 *     tags:
 *       - Hall
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - isActive
 *             properties:
 *               name:
 *                 type: string
 *                 example: Main Hall
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Hall created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Main Hall"
 */

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(validateReqBody(getHallValidator())),
  asyncHandler(createHall),
);

/**
 * @swagger
 * /api/hall/delete/{id}:
 *   delete:
 *     summary: Delete a hall
 *     tags:
 *       - Hall
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the hall to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hall deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Main Hall"
 */

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(deleteHall),
);

/**
 * @swagger
 * /api/hall/add-seat/{hallId}:
 *   post:
 *     summary: Add a new seat to a hall
 *     tags:
 *       - Hall
 *     parameters:
 *       - name: hallId
 *         in: path
 *         required: true
 *         description: ID of the hall to add the seat to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - row
 *               - number
 *               - isActive
 *             properties:
 *               row:
 *                 type: string
 *                 example: "A1"
 *               number:
 *                 type: number
 *                 example: 1
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Seat added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 number:
 *                   type: number
 *                   example: 1
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 name:
 *                   type: string
 *                   example: "A1"
 */

router.post(
  "/add-seat/:hallId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(validateReqBody(getSeatValidator())),
  asyncHandler(createSeat),
);

/**
 * @swagger
 * /api/hall/delete-seat/{hallId}/{seatId}:
 *   delete:
 *     summary: Delete a seat from a hall
 *     tags:
 *       - Hall
 *     parameters:
 *       - name: hallId
 *         in: path
 *         required: true
 *         description: ID of the hall to delete the seat from
 *         schema:
 *           type: string
 *       - name: seatId
 *         in: path
 *         required: true
 *         description: ID of the seat to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seat deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "1"
 *                 number:
 *                   type: number
 *                   example: 1
 *                 isActive:
 *                   type: boolean
 *                   example: true
 *                 name:
 *                   type: string
 *                   example: "A1"
 */

router.delete(
  "/delete-seat/:hallId/:seatId",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(deleteSeat),
);

module.exports = {
  router,
};
