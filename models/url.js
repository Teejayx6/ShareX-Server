/*
    OFC you need to read this to know this is a URL model
*/
const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
    id: String,
    views: Number,
    uploader: String,
    redirect: String,
    CreatedAt: String,
});

module.exports = mongoose.model("url", UrlSchema);