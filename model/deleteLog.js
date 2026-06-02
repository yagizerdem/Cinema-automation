const mongoose = require("mongoose");
const { Schema } = mongoose;

const DeleteLogSchema = new Schema(
  {
    collectionName: { type: String, required: true },
    documentId: { type: Schema.Types.ObjectId, required: true },

    deletedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    affectedUser: { type: Schema.Types.ObjectId, ref: "User" },

    reason: { type: String, required: true },
    snapshot: { type: Schema.Types.Mixed },

    deletedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const DeleteLog = mongoose.model("DeleteLog", DeleteLogSchema);

module.exports = { DeleteLog };
