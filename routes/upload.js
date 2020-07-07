const logger = require('../logger');
const config = require('../config.json');
const users = config.users;
const keys = config.keys;

const fs = require('fs');
const path = require('path');

const words = require('an-array-of-english-words');

toUpperCaseLetter = function (word) {
    output = word.charAt(0).toUpperCase() + word.slice(1);
    return output;
};

module.exports = (req, res) => {
    if (!req.body.u || !users[req.body.u]) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No user.',
            fix: 'idrk what to put here but if you get this error you know what it means lol.'
        }
    }));
    const user = req.body.u;
    const password = users[req.body.u];

    if (req.body.password !== password) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'Incorrect Password.',
            fix: 'idrk what to put here but if you get this error you know what it means lol.'
        }
    }));
    logger.auth(`Authenticated user ${user}`);

    if (!req.files.file) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No file was uploaded.',
            fix: 'Upload a file.'
        }
    }));

    if (!fs.existsSync(`./uploads/${req.body.u}`)) {
        fs.mkdirSync(`./uploads/${req.body.u}`);
        logger.info(`Created /uploads/${req.body.u}/ directory`);
    }

    let createFileName = (fileExt) => {
        let newFileNameArray = [];
        logger.info(`Creating a file name with a length of ${req.body.FNL}`);
        for (i = 0; i < req.body.FNL; i++) {
            newFileNameArray.push(toUpperCaseLetter(words.filter(f => f.length < 5)[Math.round(Math.random() * 6972)]));
        }
        nFN = newFileNameArray.join('') + fileExt;
        let fileLocation = `./uploads/${req.body.u}/${nFN}${fileExt}`;
        if (fs.existsSync(fileLocation)) createFileName(fileExt);
        else return nFN;
    };

    let file = req.files.file;
    let fileExtension = path.extname(file.name);

    let newFileName = createFileName(fileExtension);
    let uploadPath = `uploads/${user}/${newFileName}`;

    logger.info('Uploading file ' + file.name + ' to ' + newFileName + ' (' + user + ')');

    if (config.fileExtensionCheck.enabled && config.fileExtensionCheck.extensionsAllowed.indexOf(fileExtension) == -1) {
        logger.info('File ' + file.name + ' has an invalid extension, aborting... (' + user + ')');
        return res.status(400).send(JSON.stringify({
            success: false,
            error: {
                message: 'Invalid file extension.',
                fix: 'Upload a file with a valid extension.'
            }
        }));
    }

    file.mv(uploadPath, (err) => {
        if (err) {
            logger.error(err + ' (' + user + ')');
            return res.status(500).send(err);
        }

        logger.success('Uploaded file ' + file.name + ' to ' + newFileName + ' (' + user + ')');
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            success: true,
            file: {
                url: config.protocol + config.serverUrl + '/' + user + '/' + newFileName,
                delete_url: config.protocol + config.serverUrl + '/delete?filename=' + newFileName + '&u=' + user + '&p=' + password
            }
        }));
    });
};