/* 
    The router for uploading a file
*/
const config = require('../../../config.json');

const words = require('../../../util/words.json');
const colors = require('colors');

const { Router } = require('express');
const { existsSync, mkdirSync } = require('fs');
const path = require('path');

const { getUserFromKey, addUserUpload, saveFile, setUserDomain, setUserSubDomain } = require('../../../database/index');
const { filePOST } = require('../../../util/logger');

const router = Router();

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 25
});
router.use(limiter);

const fileUpload = require('express-fileupload');
router.use(fileUpload({
    safeFileNames: true,
    preserveExtension: 7,
    useTempFiles: true,
    tempFileDir: path.resolve(__dirname + '../../../temp/'),
    limits: {
        fileSize: config.maxFileSize || 9007199254740991
    }
}));

let toUpperCaseLetter = (word) => {
    let output = word.charAt(0).toUpperCase() + word.slice(1);
    return output;
};

let createFileName = (fileExt, loc, FNL) => {
    if (typeof FNL !== 'number') throw new Error('File name length is not a number.');

    let nFN = Math.floor(Math.random() * 9007199254740991).toString(36) + '.' + fileExt;
    let fileLocation = `./uploads/${loc}/${nFN}.${fileExt}`;
    if (existsSync(fileLocation)) return createFileName(fileExt, loc, FNL);
    return nFN;
};

router.post('/api/upload', async (req, res) => {
    let key = req.headers.key;
    if (!key) return res.status(400).json({
        "error": "No key was provided in the headers."
    });

    let userData = await getUserFromKey(key);
    if (userData == null) return res.status(400).json({
        "error": "An incorrect key was provided in the headers."
    });

    if (!req.files || !req.files.file) return res.status(400).json({
        "error": "No file was uploaded."
    });

    let FNL = parseInt(req.body.fnl) || 6;

    let location = userData.name;
    let fileName = req.files.file.name.split('.');
    let fileExt = fileName[fileName.length - 1];
    let name = createFileName(fileExt, location, FNL);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let uploadPath = `uploads/${location}/${year}/${month}/${day}/${name}`;

    if (!existsSync(`./uploads/${location}`)) mkdirSync(`./uploads/${location}`);
    if (!existsSync(`./uploads/${location}/${year}`)) mkdirSync(`./uploads/${location}/${year}`);
    if (!existsSync(`./uploads/${location}/${year}/${month}`)) mkdirSync(`./uploads/${location}/${year}/${month}`);
    if (!existsSync(`./uploads/${location}/${year}/${month}/${day}`)) mkdirSync(`./uploads/${location}/${year}/${month}/${day}`);

    req.files.file.mv(uploadPath, async (err) => {
        if (err) return res.status(500).send(err);

        let lockActive = req.body.locked || false;
        let lockPassword = req.body.password || 'none';

        await saveFile({
            uploader: location,
            path: uploadPath,
            name: name,
            UploadedAt: new Date(),
            views: 0,
            lock: {
                active: lockActive,
                password: lockPassword
            }
        });

        let mainURL = userData.domain == undefined || userData.domain == "none" ? config.mainURL : (userData.subdomain == undefined || userData.subdomain == "none" ? config.mainURL : `https://${userData.subdomain}.${userData.domain}`);
        let url = mainURL + '/files/' + name;

        await addUserUpload(key);

        filePOST(name, req.ip, key);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).end(url);
    });
});

module.exports = router;
