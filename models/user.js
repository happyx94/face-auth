var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
{
	Username: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema);