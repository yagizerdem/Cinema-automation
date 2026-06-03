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

const HallSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    seats: [SeatSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Hall = mongoose.model("Hall", HallSchema);

const Seat = mongoose.model("Seat", SeatSchema);

module.exports = { Hall, Seat };
