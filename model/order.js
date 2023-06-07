var mongoose = require("mongoose");
var orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    cart: String,
});

module.exports = mongoose.model("order", orderSchema);