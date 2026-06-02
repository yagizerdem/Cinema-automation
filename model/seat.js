const mongoose = require("mongoose");
const { Schema } = mongoose;

const SeatSchema = new Schema(
  {
    row: { type: String, required: true },
    number: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Seat = mongoose.model("Seat", SeatSchema);

module.exports = { Seat };
