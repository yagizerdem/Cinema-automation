const express = require("express");
const router = express.Router();
const { buyTicketWebCredit } = require("../controller/ticket-contorller");
const asyncHandler = require("../util/async-handler");
const { allowedRoles } = require("../middleware/auth-middleware");
const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const {
  getCreateTicketWebValidator,
} = require("../validator/ticket-validator");

/**
 * @swagger
 * /api/ticket/buy-ticket-web-credit:
 *   post:
 *     summary: Buy a ticket from web
 *     tags:
 *       - Ticket
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - screening
 *               - seat
 *             properties:
 *               screening:
 *                 type: string
 *                 pattern: "^[a-fA-F0-9]{24}$"
 *                 example: "685f8f1d4b6e9a1234567890"
 *               seat:
 *                 type: object
 *                 required:
 *                   - row
 *                   - number
 *                 properties:
 *                   row:
 *                     type: string
 *                     example: "A"
 *                   number:
 *                     type: number
 *                     example: 7
 *     responses:
 *       201:
 *         description: Ticket bought successfully
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - only customers can buy tickets
 */

router.post(
  "/buy-ticket-web-credit",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("CUSTOMER")),
  asyncHandler(validateReqBody(getCreateTicketWebValidator())),
  asyncHandler(buyTicketWebCredit),
);

module.exports = { router };
