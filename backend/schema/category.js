var mongoose = require("mongoose");
var db = mongoose.connection;

var Schema = mongoose.Schema;

var Category = new Schema({
  category: Array
});

var Category = mongoose.model("category", Category);
module.exports = Category;
