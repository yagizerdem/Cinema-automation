const mongoose = require("mongoose");
const { Schema } = mongoose;

const HallSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    seats: [{ type: Schema.Types.ObjectId, ref: "Seat" }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const Hall = mongoose.model("Hall", HallSchema);

module.exports = { Hall };
