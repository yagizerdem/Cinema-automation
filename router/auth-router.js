const express = require("express");
const router = express.Router();
const {
  login,
  register,
  logout,
  me,
  googleOAuthCallback,
} = require("../controller/auth-controller");
const asyncHandler = require("../util/async-handler");

const { validateReqBody } = require("../middleware/validation-middleware");
const passport = require("passport");
const {
  getLoginValidator,
  getRegisterValidator,
} = require("../validator/auth-validator");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *             example:
 *               email: test@gmail.com
 *               password: "123456"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 */

router.post(
  "/login",
  asyncHandler(validateReqBody(getLoginValidator())),
  asyncHandler(login),
);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - firstName
 *               - lastName
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Ousterhout"
 *     responses:
 *       200:
 *         description: Successfully registered
 */

router.post(
  "/register",
  asyncHandler(validateReqBody(getRegisterValidator())),
  asyncHandler(register),
);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out a user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully logged out
 */

router.post("/logout", asyncHandler(logout));

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get the current user's details
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully fetched user details
 */
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  asyncHandler(me),
);

/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     summary: Start Google OAuth login
 *     tags:
 *       - Auth
 *     description: Redirects the user to Google's OAuth consent screen.
 *     responses:
 *       302:
 *         description: Redirects to Google OAuth login page
 */

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags:
 *       - Auth
 *     description: Handles Google OAuth callback, creates or finds user, sets JWT cookie, and redirects to frontend.
 *     responses:
 *       302:
 *         description: Redirects to frontend after successful login or redirects to login page on failure
 */

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  asyncHandler(googleOAuthCallback),
);

module.exports = { router };
