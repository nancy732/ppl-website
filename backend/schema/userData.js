var mongoose = require("mongoose");
var db = mongoose.connection;

 var Schema = mongoose.Schema;

 var signinS = new Schema({
   Username:  String, // String is shorthand for {type: String}
   email: String,
   psw:   String,
   PhoneNumber: Number
 });

var signin= mongoose.model("signin",signinS)
module.exports = signin