const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  film: { type: mongoose.Schema.Types.ObjectId, ref: "Film", required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },

  date: Date, // e.g., 2025-12-04
  time: String, // e.g., "19:00"

  isSpecial: Boolean, // festival / special day
  basePrice: Number,
});

const Session = mongoose.model("Session", schema);

module.exports = { Session };
