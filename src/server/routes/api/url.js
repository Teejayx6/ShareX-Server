/*
    The router for creating a short url
*/
const config = require('../../../config.json');

const { Router, json, urlencoded } = require('express');

const { saveURL, getURL, getUserFromKey } = require('../../../database/index');
const { urlAPIGET, urlPOST } = require('../../../util/logger');

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/api/url/:id", async (req, res) => {
    let urlID = req.params.id;
    if (!urlID) return res.status(401).json({
        "error": "No URL ID provided."
    });

    let urlData = await getURL(urlID);
    if (urlData == null) return res.status(401).json({
        "error": "URL not found."
    });

    let returnObj = {
        "id": urlData.id,
        "link": `${config.mainURL}/url/${urlData.id}`,
        "views": urlData.views,
        "uploader": urlData.uploader,
        "redirect": urlData.redirect,
        "CreatedAt": urlData.CreatedAt,
    };

    urlAPIGET(urlData.id, req.ip);

    return res.status(200).json(returnObj);
});

router.post("/api/url", async (req, res) => {
    let key = req.headers.key;
    if (!key) return res.status(401).json({
        "error": "No key was provided in the headers."
    });

    let userData = await getUserFromKey(key);
    if (userData == null) return res.status(401).json({
        "error": "An incorrect key was provided in the headers."
    });

    let url = req.body.url;
    if (!url) return res.status(400).json({
        "error": "No url provided."
    });

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
    res.status(200).end(mainURL + '/url/' + redirectNum);

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
