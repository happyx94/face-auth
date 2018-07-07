var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
{
	name: String,
   	email: String,
   	phone: String,
    password: String,
    path: String
});

module.exports = mongoose.model("User", UserSchema);