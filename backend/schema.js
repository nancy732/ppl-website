var mongoose = require("mongoose");
var db = mongoose.connection;

 var Schema = mongoose.Schema;

 var uploads = new Schema({
   email: String,  
   fileName: String,
   PostName: String,
   category: String
 });

var upload= mongoose.model("upload",uploads)
module.exports = upload