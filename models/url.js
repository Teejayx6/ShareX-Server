const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
    uploader: String,
    redirect: String,
    id: String,
    CreatedAt: String,
    views: Number,
    lock: {
        active: Boolean,
        password: String
    }
});

module.exports = mongoose.model("url", UrlSchema);