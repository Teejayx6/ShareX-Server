/*
    The router for not logging an IP
*/
const { Router } = require('express');

const { saveIP } = require('../../database/index');

const router = Router();

router.get("/nolog", async (req, res) => {
    saveIP(req.ip);
    res.redirect('/aipnl.html');
});

module.exports = router;