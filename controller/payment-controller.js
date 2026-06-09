const { stripe } = require("../stripe-wrapper");
const { HttpStatusCode } = require("../util/http-status-codes");
const { ApiResponse } = require("../util/api-response");
const { AppError } = require("../util/app-error");

async function buyCredit(req, res) {
  const { email, _id } = req.user;
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
    metadata: {
      userId: _id.toString(),
      amount: amount.toString(),
    },
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
  let event;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret,
      );
    } catch (err) {
      console.log(`Webhook signature verification failed: ${err.message}`);
      return res.sendStatus(HttpStatusCode.BAD_REQUEST);
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;
        console.log(paymentIntent);
        break;

      case "payment_method.attached":
        const paymentMethod = event.data.object;
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  }
}

module.exports = { buyCredit, buyCreditWebhook };
