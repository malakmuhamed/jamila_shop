var mongoose = require("mongoose");
var imageSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  offer: Number,
  desc: String,
  img: String,
  num: Number,
});

module.exports = mongoose.model("products", imageSchema);
