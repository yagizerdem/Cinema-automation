const mongoose = require("mongoose");
const { entityStatus } = require("../../enum/entityStatus");

const schema = new mongoose.Schema({
  title: String,
  duration: Number,
  category: String,
  description: String,
  posterUrl: String,
  entityStatus: {
    type: String,
    enum: Object.values(entityStatus),
    default: entityStatus.ACTIVE,
  },
});

const Film = mongoose.model("Film", schema);

module.exports = { Film };
