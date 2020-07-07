const fs = require('fs');


module.exports = (req, res) => {
    if (!req.query.u) return res.redirect('/login');
    if (!req.query.p) return res.redirect('/login');
    let path = `./uploads/${req.query.u}/`;
    if (fs.existsSync(path)) {
        let files = fs.readdirSync(`./uploads/${req.query.u}/`);

        res.setHeader('Content-Type', 'application/json');
        return res.status(400).send(files.join('\n'));
    } else {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).send('404 User Not Found');
    }
};