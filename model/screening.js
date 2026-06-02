// models/Screening.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ScreeningSchema = new Schema(
  {
    movie: { type: Schema.Types.ObjectId, ref: "Movie", required: true },
    hall: { type: Schema.Types.ObjectId, ref: "Hall", required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    basePrice: { type: Number, required: true },
    isSpecialSession: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Screening = mongoose.model("Screening", ScreeningSchema);

module.exports = { Screening };
