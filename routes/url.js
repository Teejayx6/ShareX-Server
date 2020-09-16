const { Router } = require('express');

let URLModel = require('../models/url');

const router = Router();

router.get("/url/:id", async (req, res) => {
    let URLID = req.params.id;
    if (!URLID) return res.send('no');

    let URLData = await URLModel.findOne({ id: URLID });
    if (URLData == null) return res.send('yes');

    await URLModel.findOneAndUpdate({ id: URLID }, { views: URLData.views + 1 });
    return res.status(301).redirect(URLData.redirect);
});

module.exports = router;