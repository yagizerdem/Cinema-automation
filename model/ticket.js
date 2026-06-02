// models/Ticket.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const TicketSchema = new Schema(
  {
    screening: {
      type: Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    buyer: { type: Schema.Types.ObjectId, ref: "User" },

    seat: {
      row: { type: String, required: true },
      number: { type: Number, required: true },
    },

    salesChannel: {
      type: String,
      enum: ["BOX_OFFICE", "WEB"],
      required: true,
    },

    ticketType: {
      type: String,
      enum: ["FULL", "STUDENT", "VIP_FREE", "VIP_DISCOUNT", "VIP_GUEST"],
      required: true,
    },

    price: { type: Number, required: true },
    payment: { type: Schema.Types.ObjectId, ref: "Payment" },

    soldBy: { type: Schema.Types.ObjectId, ref: "User" },
    soldAt: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: ["SOLD", "CANCELLED"],
      default: "SOLD",
    },
  },
  { timestamps: true },
);

TicketSchema.index(
  { screening: 1, "seat.row": 1, "seat.number": 1 },
  { unique: true, partialFilterExpression: { status: "SOLD" } },
);

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = { Ticket };
