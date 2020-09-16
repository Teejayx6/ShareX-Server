const { Router } = require('express');

let URLModel = require('../models/url');

const router = Router();

const morgan = require('morgan');
const colors = require('colors');
morgan.token('ip2', function (req, res) { return req.ip.replace('::ffff:', '').replace('::1', 'localhost'); });
router.use(morgan(`${colors.cyan(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "POST"; } }));
router.use(morgan(`${colors.green(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "GET"; } }));

router.get("/url/:id", async (req, res) => {
    let URLID = req.params.id;
    if (!URLID) return res.send('no');

    let URLData = await URLModel.findOne({ id: URLID });
    if (URLData == null) return res.send('yes');

    await URLModel.findOneAndUpdate({ id: URLID }, { views: URLData.views + 1 });
    return res.status(301).redirect(URLData.redirect);
});

module.exports = router;