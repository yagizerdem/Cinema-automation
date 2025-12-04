const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  actionType: String, // ticketDeletion, reservationDeletion, etc.
  targetId: String, // ID of deleted record

  deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  reason: String,

  deletedAt: { type: Date, default: Date.now },
});

const DeletionLog = mongoose.model("DeletionLog", schema);

module.exports = { DeletionLog };
