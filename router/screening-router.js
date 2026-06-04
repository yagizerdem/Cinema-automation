const express = require("express");
const router = express.Router();
const {
  createScreening,
  deleteScreening,
  getScreenings,
} = require("../controller/screening-controller");
const asyncHandler = require("../util/async-handler");
const { allowedRoles } = require("../middleware/auth-middleware");
const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const { getScreeningValidator } = require("../validator/screening-validator");

/**
 * @swagger
 * /api/screening/create:
 *   post:
 *     summary: Create a new screening
 *     tags:
 *       - Screening
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - movie
 *               - hall
 *               - startTime
 *               - endTime
 *               - basePrice
 *             properties:
 *               movie:
 *                 type: string
 *                 pattern: "^[a-fA-F0-9]{24}$"
 *                 example: "685f8f1d4b6e9a1234567890"
 *               hall:
 *                 type: string
 *                 pattern: "^[a-fA-F0-9]{24}$"
 *                 example: "685f8f1d4b6e9a1234567891"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-04T18:00:00.000Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 example: "2026-06-04T20:49:00.000Z"
 *                 description: Must be after startTime
 *               basePrice:
 *                 type: number
 *                 minimum: 0
 *                 example: 150
 *               isSpecialSession:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Screening created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "685f8f1d4b6e9a1234567892"
 *                 movie:
 *                   type: string
 *                   example: "685f8f1d4b6e9a1234567890"
 *                 hall:
 *                   type: string
 *                   example: "685f8f1d4b6e9a1234567891"
 *                 startTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-06-04T18:00:00.000Z"
 *                 endTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-06-04T20:49:00.000Z"
 *                 basePrice:
 *                   type: number
 *                   example: 150
 *                 isSpecialSession:
 *                   type: boolean
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 */

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(validateReqBody(getScreeningValidator())),
  asyncHandler(createScreening),
);

/**
 * @swagger
 * /api/screening/delete/{id}:
 *   post:
 *     summary: Delete a screening
 *     tags:
 *       - Screening
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Screening ID to delete
 *         schema:
 *           type: string
 *           pattern: "^[a-fA-F0-9]{24}$"
 *           example: "685f8f1d4b6e9a1234567892"
 *     responses:
 *       200:
 *         description: Screening deleted successfully
 *       400:
 *         description: Invalid screening ID
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - ADMIN role required
 *       404:
 *         description: Screening not found
 */

router.post(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(deleteScreening),
);

/**
 * @swagger
 * /api/screening/get-screenings:
 *   get:
 *     summary: Get screenings
 *     tags:
 *       - Screening
 *     parameters:
 *       - name: movie
 *         in: query
 *         required: false
 *         description: Filter screenings by movie ObjectId
 *         schema:
 *           type: string
 *           pattern: "^[a-fA-F0-9]{24}$"
 *         example: "685f8f1d4b6e9a1234567890"
 *       - name: hall
 *         in: query
 *         required: false
 *         description: Filter screenings by hall ObjectId
 *         schema:
 *           type: string
 *           pattern: "^[a-fA-F0-9]{24}$"
 *         example: "685f8f1d4b6e9a1234567891"
 *       - name: startTime[gte]
 *         in: query
 *         required: false
 *         description: Filter screenings starting after or at this date
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2026-06-04T00:00:00.000Z"
 *       - name: startTime[lte]
 *         in: query
 *         required: false
 *         description: Filter screenings starting before or at this date
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2026-06-04T23:59:59.000Z"
 *       - name: endTime[gte]
 *         in: query
 *         required: false
 *         description: Filter screenings ending after or at this date
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2026-06-04T18:00:00.000Z"
 *       - name: endTime[lte]
 *         in: query
 *         required: false
 *         description: Filter screenings ending before or at this date
 *         schema:
 *           type: string
 *           format: date-time
 *         example: "2026-06-04T23:00:00.000Z"
 *       - name: basePrice[gte]
 *         in: query
 *         required: false
 *         description: Filter screenings with price greater than or equal to value
 *         schema:
 *           type: number
 *         example: 100
 *       - name: basePrice[lte]
 *         in: query
 *         required: false
 *         description: Filter screenings with price less than or equal to value
 *         schema:
 *           type: number
 *         example: 250
 *       - name: isSpecialSession
 *         in: query
 *         required: false
 *         description: Filter screenings by special session status
 *         schema:
 *           type: boolean
 *         example: false
 *       - name: sort
 *         in: query
 *         required: false
 *         description: Comma-separated fields to sort by
 *         schema:
 *           type: string
 *         example: "startTime,basePrice"
 *       - name: sortAsc
 *         in: query
 *         required: false
 *         description: If true, sort ascending. If omitted, sort descending.
 *         schema:
 *           type: boolean
 *         example: true
 *       - name: fields
 *         in: query
 *         required: false
 *         description: Comma-separated fields to return
 *         schema:
 *           type: string
 *         example: "movie,hall,startTime,endTime,basePrice,isSpecialSession"
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
 *         description: Number of screenings per page
 *         schema:
 *           type: number
 *         example: 10
 *     responses:
 *       200:
 *         description: Screenings fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "685f8f1d4b6e9a1234567892"
 *                   movie:
 *                     type: string
 *                     example: "685f8f1d4b6e9a1234567890"
 *                   hall:
 *                     type: string
 *                     example: "685f8f1d4b6e9a1234567891"
 *                   startTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-06-04T18:00:00.000Z"
 *                   endTime:
 *                     type: string
 *                     format: date-time
 *                     example: "2026-06-04T20:49:00.000Z"
 *                   basePrice:
 *                     type: number
 *                     example: 150
 *                   isSpecialSession:
 *                     type: boolean
 *                     example: false
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
  "/get-screenings",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("ADMIN")),
  asyncHandler(getScreenings),
);

module.exports = { router };
