/*
    The router for redirecting
*/
const { Router } = require('express');

const { addURLView, getURL } = require('../database/index');
const { urlGET } = require('../util/logger');

const router = Router();

router.get("/url/:id", async (req, res) => {
    let URLID = req.params.id;
    if (!URLID) return res.status(302).redirect('/404.html');

    let URLData = await getURL(URLID);
    if (URLData == null) return res.status(302).redirect('/404.html');

    await addURLView(URLID);
    res.status(302).redirect(URLData.redirect);

    urlGET(req.ip, URLData.redirect);
});

module.exports = router;