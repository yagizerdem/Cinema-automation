const express = require("express");
const router = express.Router();
const asyncHandler = require("../util/async-handler");
const { buyCreditWebhook } = require("../controller/payment-controller");

router.post("/webhook", asyncHandler(buyCreditWebhook));

module.exports = { router };
