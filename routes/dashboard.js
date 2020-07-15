const userModel = require('../models/user');
const fileModel = require('../models/file');
const urlModel = require('../models/url');

module.exports = async (req, res) => {
    let key = req.query.key;
    if (!key) return res.redirect('/404');//////////////////

    let userData = await userModel.findOne({ key: key });
    if (!userData) return res.redirect('/404');

    let userLogins = userData.logins;
    let newUserLogins = userLogins + 1;
    await userModel.findOneAndUpdate({ key: key }, { logins: newUserLogins });

    let user = userData.name;
    let userFiles = await fileModel.find({ uploader: user });
    let userURLs = await urlModel.find({ uploader: user });

    userURLs.forEach(e => {
        
    })

    return res.render('dashboard.ejs', { userData: userData, files: userFiles, urls: userURLs });
};