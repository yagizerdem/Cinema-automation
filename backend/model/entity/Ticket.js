const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  seat: String,
  type: String, // "full", "student", "vip", "vipGuest"
  price: Number,

  soldAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model("Ticket", schema);

module.exports = { Ticket };
