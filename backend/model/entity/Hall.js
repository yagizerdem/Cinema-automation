const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  capacity: Number,
  seats: [[String]], // 2D seat layout, e.g. [["A1","A2"], ["B1","B2"]]
});

const Hall = mongoose.model("Hall", schema);

module.exports = { Hall };
