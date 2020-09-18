const { Router } = require('express');

let URLModel = require('../models/url');

const router = Router();

router.get("/url/:id", async (req, res) => {
    let URLID = req.params.id;
    if (!URLID) return res.status(302).redirect('/404.html');

    let URLData = await URLModel.findOne({ id: URLID });
    if (URLData == null) return res.status(302).redirect('/404.html');

    await URLModel.findOneAndUpdate({ id: URLID }, { views: URLData.views + 1 });
    res.status(302).redirect(URLData.redirect);

    let ip = await require('../models/ip').parseIP(req.ip);
    console.log(`${'[GET]'.green} ${'REDIRECTED'.bgMagenta.black} ${URLData.redirect.bgGreen.black} ${ip.bgWhite.black}`);
});

module.exports = router;