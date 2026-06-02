const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, sparse: true },
    phone: { type: String },
    password: { type: String },

    role: {
      type: String,
      enum: [
        "CUSTOMER",
        "BOX_OFFICE",
        "BOX_OFFICE_SUPERVISOR",
        "MANAGER",
        "ADMIN",
      ],
      default: "CUSTOMER",
    },

    membershipStatus: {
      type: String,
      enum: ["CANDIDATE", "APPROVED", "REJECTED"],
      default: "CANDIDATE",
    },

    membershipType: {
      type: String,
      enum: ["NORMAL", "VIP", "VIP_GUEST"],
      default: "NORMAL",
    },

    gender: { type: String },
    birthDate: { type: Date },
    occupation: { type: String },
    incomeLevel: { type: String },

    rejectionReason: { type: String },
    approvedAt: { type: Date },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = { User };
