const config = require('../config.json');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config.webhookurl);

const userModel = require('../models/user.js');
const fileModel = require('../models/file.js');

const fs = require('fs');
const path = require('path');
const words = require('an-array-of-english-words');

toUpperCaseLetter = function (word) {
    output = word.charAt(0).toUpperCase() + word.slice(1);
    return output;
};

module.exports = async (req, res) => {
    let key = req.body.key;
    if (!key) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No Key.',
            fix: 'You need a valid key in order to upload.'
        }
    }));

    let userData = await userModel.findOne({ key: key });

    if (!userData) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'Invalid Key.',
            fix: 'You need a valid key in order to upload.'
        }
    }));

    if (userData.allowed == false) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'You are not yet allowed to upload.',
            fix: 'Wait until you are authorized to upload.'
        }
    }));

    if (!req.files.file) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No file was uploaded.',
            fix: 'Upload a file.'
        }
    }));

    function createFileName(fileExt) {
        let newFileNameArray = [];
        let FNL;
        if (new Number(req.body.FNL) < 0 || new Number(req.body.FNL) > 63) FNL = 6;
        else FNL = 6;

        for (i = 0; i < FNL; i++) {
            newFileNameArray.push(toUpperCaseLetter(words.filter(f => f.length < 5)[Math.round(Math.random() * 6972)]));
        }

        nFN = newFileNameArray.join('') + fileExt;
        let fileLocation = `./uploads/${userData.name}/${nFN}${fileExt}`;
        if (fs.existsSync(fileLocation)) createFileName(fileExt);
        else return nFN;
    };

    let file = req.files.file;
    let fileExtension = path.extname(file.name);

    let newFileName = createFileName(fileExtension);
    let uploadPath = `uploads/${userData.name}/${newFileName}`;

    let password;
    if (req.body.password) password = req.body.password;
    else password = 'none';

    let locked;
    if (req.body.locked) locked = true;
    else locked = false;

    file.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);

        fileModel.create({
            uploader: userData.name,
            path: uploadPath,
            name: uploadPath.split('/')[2],
            UploadedAt: new Date,
            views: 0,
            lock: {
                active: locked,
                password: password
            }
        });

        let url = config.protocol + config.url + '/files/' + newFileName;
        let delete_url = config.protocol + config.url + '/delete/' + newFileName + '?key=' + key;

        let userUploads = userData.uploads;
        let newUserUploads = userUploads + 1;
        await userModel.findOneAndUpdate({ key: key }, { uploads: newUserUploads });

        let uploadEmbed = new MessageBuilder()
            .setTitle("File Upload")
            .setURL(url)
            .addField('Uploaded By:', userData.name);
        await hook.send(uploadEmbed);

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true,
            file: {
                url: url,
                delete_url: delete_url
            }
        }));
    });
};