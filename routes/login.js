module.exports = (req, res) => {
    return res.render('login.ejs', { req: req, res: res });
}