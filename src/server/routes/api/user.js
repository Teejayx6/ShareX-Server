/*
    The router for creating a short url
*/
const config = require('../../../config.json');

const { Router, json, urlencoded } = require('express');

const { getUserFromKey } = require('../../../database/index');
const { urlPOST } = require('../../../util/logger');

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/api/user", async (req, res) => {
    let key = req.headers.key;
    if (!key) return res.status(401).json({
        "error": "No key was privided in the headers."
    });

    let userData = await getUserFromKey(key);
    if (userData == null) return res.status(401).json({
        "error": "An incorrect key was privided in the headers."
    });

    let returnObj = {
        "key": userData.key,
        "name": userData.name,
        "owner": userData.owner,
        "uploads": userData.uploads,
        "redirects": userData.redirects,
        "discord": userData.discord,
        "CreatedAt": userData.CreatedAt
    };

    return res.status(200).json(returnObj);
});

module.exports = router;
