/*
    The router for creating a short url
*/
const config = require('../../config.json');

const { Router, json, urlencoded } = require('express');

const { saveURL, getURL, getUserFromKey } = require('../../database/index');
const { urlPOST } = require('../../util/logger');

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.post("/api/url", async (req, res) => {
    let key = req.headers.key;
    if (!key) return res.status(400).send(JSON.stringify({
        error: "No key was privided in the headers."
    }));

    let userData = await getUserFromKey(key);
    if (userData == null) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided in the headers."
    }));

    let url = req.body.url;
    if (!url) return res.status(400).send(JSON.stringify({
        error: "No url provided."
    }));

    let redirectNum = await CreateUrl(10);

    await saveURL({
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

    urlPOST(url, req.ip, key);
});

let CreateUrl = async (length) => {
    length = parseInt(length);
    let number = Math.floor(Math.random() * (10 ** length)).toString(36);
    let urlTest = await getURL(number);
    if (urlTest) return CreateUrl(Numbe(parseInt(length)));
    return number;
};

module.exports = router;