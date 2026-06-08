const express = require("express");
const router = express.Router();
const {
  buyCredit,
  buyCreditWebhook,
} = require("../controller/payment-controller");
const asyncHandler = require("../util/async-handler");

const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const { allowedRoles } = require("../middleware/auth-middleware");
const { getPaymentValidator } = require("../validator/payment-validator");

/**
 * @swagger
 * /api/payment/buy-credit:
 *   post:
 *     summary: Create Stripe checkout session for buying credit
 *     tags:
 *       - Payment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 10
 *     responses:
 *       200:
 *         description: Checkout session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Checkout session created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       example: https://checkout.stripe.com/c/pay/cs_test_...
 *                     sessionId:
 *                       type: string
 *                       example: cs_test_a1b2c3
 *       400:
 *         description: Invalid amount
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router.post(
  "/buy-credit",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(allowedRoles("CUSTOMER")),
  asyncHandler(validateReqBody(getPaymentValidator())),
  asyncHandler(buyCredit),
);

router.post(
  "/buy-credit-webhook",
  express.raw({ type: "application/json" }),
  asyncHandler(buyCreditWebhook),
);

module.exports = { router };
