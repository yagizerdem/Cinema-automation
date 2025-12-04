const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: String,
  duration: Number,
  category: String,
  description: String,
  posterUrl: String,
});

const Film = mongoose.model("Film", schema);

module.exports = { Film };
