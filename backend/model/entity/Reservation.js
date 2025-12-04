const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  seat: String,
  code: String, // confirmation code / barcode

  reservedAt: { type: Date, default: Date.now },
  expiresAt: Date, // sessionStart - 1 hour

  isConfirmed: Boolean,
});

const Reservation = mongoose.model("Reservation", schema);

module.exports = { Reservation };
