const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    key: String,
    name: String,
    disc: String,
    logins: Number,
    uploads: Number,
    owner: Boolean,
    admin: Boolean,
    allowed: Boolean
});

module.exports = mongoose.model("users", UserSchema);