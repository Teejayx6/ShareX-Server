const config = require('../config.json');
const { Router } = require('express');

const URLModel = require('../models/url');
const userModel = require('../models/user');

const router = Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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

router.post("/api/url", async (req, res) => {
    let key = req.headers.key;
    if (!key) return res.status(400).send(JSON.stringify({
        error: "No key was privided in the headers."
    }));

    let userData = await userModel.findOne({ key: key });
    if (userData == null) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided in the headers."
    }));

    let url = req.body.url;
    if (!url) return res.status(400).send(JSON.stringify({
        error: "No url provided."
    }));

    let redirectNum = await CreateUrl(10);

    await URLModel.create({
        id: redirectNum,
        views: 0,
        uploader: userData.name,
        redirect: url,
        CreatedAt: new Date()
    });

    let mainURL = config.mainURL || "URL NOT SETUP";
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        url: mainURL + '/url/' + redirectNum
    }));
});

let CreateUrl = async (length) => {
    length = parseInt(length);
    let number = Math.floor(Math.random() * (10 ** length)).toString(36);
    let urlTest = await URLModel.findOne({ id: number });
    if (urlTest) return CreateUrl(Numbe(parseInt(length)));
    return number;
};

module.exports = router;