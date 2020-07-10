const urlModel = require('../models/url.js');

module.exports = async (req, res) => {
    let number = req.params.number;
    if (!number) return res.render('404.ejs', {req: req, res: res});

    let urlData = await urlModel.findOne({ id: number });
    if (!urlData) return res.render('404.ejs', { req: req, res: res });

    return res.status(302).redirect(urlData.redirect);
};