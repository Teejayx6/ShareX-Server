const words = require('an-array-of-english-words');
const config = require('../config.json');
const colors = require('colors');
const { Router } = require('express');
const { existsSync, mkdirSync, fstat } = require('fs');

const userModel = require('../models/user');
const fileModel = require('../models/file');

const router = Router();

const fileUpload = require('express-fileupload');
router.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
        fileSize: config.maxFileSize || 9007199254740991
    }
}));

const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');
router.use(new RateLimit({
    store: new MongoStore({
        uri: config.connectURI || "mongodb://localhost/sharex-server",
        collectionName: "upload-limiter"
    }),
    windowMs: 10 * 60 * 1000,
    max: 25
}));

let toUpperCaseLetter = (word) => {
    let output = word.charAt(0).toUpperCase() + word.slice(1);
    return output;
};

let createFileName = (fileExt, loc, FNL) => {
    let newFileNameArray = [];
    if (typeof FNL !== 'number') throw new Error('File name length is not a number.');

    for (let i = 0; i < FNL; i++) {
        let word = toUpperCaseLetter(words.filter(f => f.length < 5)[Math.round(Math.random() * 6972)]);
        newFileNameArray.push(word);
    }

    let nFN = newFileNameArray.join('') + '.' + fileExt;
    let fileLocation = `./uploads/${loc}/${nFN}.${fileExt}`;
    if (existsSync(fileLocation)) return createFileName(fileExt, loc, FNL);
    return nFN;
};

router.post('/api/upload', async (req, res) => {
    let key = req.headers.key;
    if (!key) return res.status(400).send(JSON.stringify({
        error: "No key was privided in the headers."
    }));

    let userData = await userModel.findOne({ key: key });
    if (userData == null) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided in the headers."
    }));

    if (!req.files.file) return res.status(400).send(JSON.stringify({
        error: "No file was uplaoded."
    }));

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

        //-------------------------
        // Add discord webhook
        //-------------------------

        let lockActive = req.body.locked || false;
        let lockPassword = req.body.password || 'none';

        await fileModel.create({
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

        let mainURL = config.mainURL || "URL NOT SETUP";
        let url = mainURL + '/files/' + name;
        let delete_url = mainURL + '/delete/' + name + '?key=' + key;

        await userModel.findOneAndUpdate({ key: key }, { uploads: userData.uploads + 1 });

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            file: {
                url: url,
                delete_url: delete_url
            }
        }));

        let ip = req.ip.replace('::ffff:', '').replace('::1', 'localhost');
        console.log(`${'[POST]'.cyan} ${'SAVED FILE'.bgRed.black} ${name.bgBlue.black} ${key.bgYellow.black} ${ip.bgWhite.black}`);
    });
});

module.exports = router;