const fileModel = require('../models/file.js');
const path = require('path');
const fs = require('fs');

module.exports = async (req, res) => {
    let urlArray = req.url.split('/');
    let fileName = urlArray[2];
    let fileData = await fileModel.findOne({ name: fileName });
    if (!fileData) return res.redirect('/404?message=File Not Found');

    let fileViews = fileData.views;
    let newFileViews = fileViews + 1;
    await fileModel.findOneAndUpdate({ name: fileName }, { views: newFileViews });

    let filePath = path.resolve(`${__dirname}/../${fileData.path}`);
    if (!fs.existsSync(filePath)) return res.redirect('/404?message=File Not Found');

    return res.sendFile(filePath);
};