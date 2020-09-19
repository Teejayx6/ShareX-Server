/*
    The router for not logging an IP
*/
const { Router } = require('express');
const colors = require('colors');
const ipFunc = require('../models/ip');

const router = Router();

router.get("/nolog", async (req, res) => {
    let ip = req.ip;
    if (ipFunc.addIP(ip)) {
        console.log(`${'[GET]'.green} ${'ADDED IP TO NO LOG WHITELIST'.bgMagenta.black}`);
        return res.redirect('/aipnl.html');
    } else return res.redirect('/404.html');
});

module.exports = router;