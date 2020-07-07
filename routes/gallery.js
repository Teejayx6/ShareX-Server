const fs = require('fs');
const config = require('../config.json');

const path = require('path');


module.exports = (req, res) => {
    if (!req.query.u) return res.redirect('/glogin');
    if (!req.query.p) return res.redirect('/glogin');
    if (!config.users[req.query.u] || config.users[req.query.u] !== req.query.p) return res.status(302).redirect("/glogin?message=Incorrect username or password");
    let path2 = `./uploads/${req.query.u}/`;
    if (fs.existsSync(path2)) {
        let files = fs.readdirSync(`./uploads/${req.query.u}/`);

        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send(files.join('\n'));
    } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).send('404 User Not Found');
    }
};