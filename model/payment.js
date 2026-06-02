const mongoose = require("mongoose");
const { Schema } = mongoose;

const PaymentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    amount: { type: Number, required: true },

    method: {
      type: String,
      enum: ["CASH", "CREDIT_CARD", "BANK_TRANSFER", "MEMBER_CREDIT"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "REFUNDED"],
      default: "PENDING",
    },

    paidAt: { type: Date },
  },
  { timestamps: true },
);

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = { Payment };
