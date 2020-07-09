const config = require('../config.json');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config.webhookurl);

const userModel = require('../models/user.js');
const fileModel = require('../models/file.js');
const path = require('path');
const { unlink } = require('fs');
module.exports = async (req, res) => {
    if (!req.query.key) return res.redirect('/');
    let userData = await userModel.findOne({ key: req.query.key });
    if (!userData) return res.redirect('/login?message=Incorrect Key');

    let userLogins = userData.logins;
    let newUserLogins = userLogins + 1;
    await userModel.findOneAndUpdate({ key: req.query.key }, { logins: newUserLogins });

    let urlArray1 = req.url.split('/');
    let urlArray = urlArray1[2].split('?')[0];
    let fileData = await fileModel.findOne({ name: urlArray });

    if (!fileData) return res.render('404.ejs', { req: req, res: res });
    let filePath = path.resolve(`${__dirname}/../${fileData.path}`);

    await fileModel.deleteOne({ name: urlArray });
    unlink(filePath, (err) => {
        if (err) throw err;
    });

    let deleteEmbed = new MessageBuilder()
        .setTitle("File Deleted")
        .addField('Deleted By:', userData.name);
    await hook.send(deleteEmbed);

    return res.redirect('/?message=File Successfully Deleted');
};