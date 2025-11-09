const mongoose = require("mongoose");
const { userRoles } = require("../../enum/userRoles");
const { entityStatus } = require("../../enum/entityStatus");

const schema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    userRole: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.CLIENT,
    },

    normalizedFirstName: { type: String },
    normalizedLastName: { type: String },
    normalizedFullName: { type: String },

    entityStatus: {
      type: String,
      enum: Object.values(entityStatus),
      default: entityStatus.ACTIVE,
    },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

schema.pre("save", function (next) {
  this.normalizedFirstName = this.firstName.toLowerCase();
  this.normalizedLastName = this.lastName.toLowerCase();
  this.normalizedFullName = `${this.firstName} ${this.lastName}`.toLowerCase();

  next();
});

const User = mongoose.model("User", schema);

module.exports = { User };
