const mongoose = require("mongoose");
const { entityStatus } = require("../../enum/entityStatus");

const schema = new mongoose.Schema({
  film: { type: mongoose.Schema.Types.ObjectId, ref: "Film", required: true },
  hall: { type: mongoose.Schema.Types.ObjectId, ref: "Hall", required: true },

  // START & END TIME — full ISO datetime (year, month, day, hour, minute, second, UTC)
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  isSpecial: Boolean, // festival / special day
  basePrice: Number,

  entityStatus: {
    type: String,
    enum: Object.values(entityStatus),
    default: entityStatus.ACTIVE,
  },
});

const Session = mongoose.model("Session", schema);

module.exports = { Session };
