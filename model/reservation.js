const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema(
  {
    screening: {
      type: Schema.Types.ObjectId,
      ref: "Screening",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    seats: [
      {
        row: { type: String, required: true },
        number: { type: Number, required: true },
      },
    ],

    code: { type: String, required: true, unique: true },
    expiresAt: { type: Date, required: true },

    status: {
      type: String,
      enum: ["ACTIVE", "CONFIRMED", "CANCELLED", "EXPIRED"],
      default: "ACTIVE",
    },

    confirmedTicket: [{ type: Schema.Types.ObjectId, ref: "Ticket" }],
  },
  { timestamps: true },
);

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = { Reservation };
