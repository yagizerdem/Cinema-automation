const mongoose = require("mongoose");
const { Schema } = mongoose;

const MovieSchema = new Schema(
  {
    title: { type: String, required: true },
    durationMinute: { type: Number, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = { Movie };
