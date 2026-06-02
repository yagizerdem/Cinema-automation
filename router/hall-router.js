const express = require("express");
const router = express.Router();
const { createHall, deleteHall } = require("../controller/hall-controller");
const asyncHandler = require("../util/async-handler");
const { allowedRoles } = require("../middleware/auth-middleware");
const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const { getHallValidator } = require("../validator/hall-validator");

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

module.exports = {
  router,
};
