const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
    uploader: String,
    path: String,
    name: String,
    UploadedAt: String,
    views: Number,
    lock: {
        active: Boolean,
        password: String
    }
});

module.exports = mongoose.model("file", FileSchema);