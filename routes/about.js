module.exports = async (req, res) => {
    return res.render('about.ejs', { req: req, res: res });
}