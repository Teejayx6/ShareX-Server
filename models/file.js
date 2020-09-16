/*
    Lol this is a file model
*/

const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
    name: String,
    path: String,
    views: Number,
    uploader: String,
    CreatedAt: String,
    lock: {
        active: Boolean,
        password: String
    }
});

module.exports = mongoose.model("file", FileSchema);