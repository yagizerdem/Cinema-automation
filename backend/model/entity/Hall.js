const mongoose = require("mongoose");
const { entityStatus } = require("../../enum/entityStatus");

const schema = new mongoose.Schema({
  name: String,
  capacity: Number,
  seats: [[String]], // 2D seat layout, e.g. [["A1","A2"], ["B1","B2"]]
  entityStatus: {
    type: String,
    enum: Object.values(entityStatus),
    default: entityStatus.ACTIVE,
  },
});

const Hall = mongoose.model("Hall", schema);

module.exports = { Hall };
