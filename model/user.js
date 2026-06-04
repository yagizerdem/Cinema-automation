const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const UserSchema = new Schema(
  {
    googleId: { type: String, unique: true, sparse: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
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
    credit: { type: Number, default: 0 },

    rejectionReason: { type: String },
    approvedAt: { type: Date },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  try {
    if (!this.isModified("password")) {
      return;
    }
    this.password = await bcrypt.hash(this.password, 10);
  } catch (err) {
    throw err;
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
