const { stripe } = require("../stripe-wrapper");
const { HttpStatusCode } = require("../util/http-status-codes");
const { ApiResponse } = require("../util/api-response");

async function buyCredit(req, res) {
  const { email } = req.user;
  const { amount } = req.body;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Credit Purchase",
            description: `Purchase of ${amount} credits`,
          },
          unit_amount: Number(amount) * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.FRONTEND_BASE_URL}/payment/success`,
    cancel_url: `${process.env.FRONTEND_BASE_URL}/payment/cancel`,
    customer_email: email,
  });

  return res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Checkout session created successfully",
      data: {
        message: "Checkout session created successfully",
        url: session.url,
        sessionId: session.id,
      },
    }),
  );
}

async function buyCreditWebhook(req, res) {
  const body = req.body;

  console.log(body);

  res.status(HttpStatusCode.OK).json(
    ApiResponse.ok({
      message: "Credit purchase successful",
    }),
  );
}

module.exports = { buyCredit, buyCreditWebhook };
