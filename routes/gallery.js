const userModel = require('../models/user.js');
const fileModel = require('../models/file.js');
const path = require('path');
module.exports = async (req, res) => {
    if (!req.query.key) return res.redirect('/login');
    let userData = await userModel.findOne({ key: req.query.key });
    if (!userData) return res.redirect('/login?message=Incorrect Key');

    let userLogins = userData.logins;
    let newUserLogins = userLogins + 1;
    await userModel.findOneAndUpdate({ key: req.query.key }, { logins: newUserLogins });

    let userName = userData.name;
    let files = await fileModel.find({ uploader: userName });

    let fileNameArray = [];
    files.forEach(f => {
        fileNameArray.push(f.name);
    });

    res.setHeader('Content-Type', 'application/json');
    return res.status(400).send(`Files:\n${fileNameArray.join('\n')}\nIf you do not see any names, its cuz u upload none lmao`);
};