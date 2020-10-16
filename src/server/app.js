/*
    The ShareX Server main file.
*/
const config = require('../config.json');
let PORT = config.port || 1234;

const colors = require('colors');

const express = require('express');

module.exports.start = () => {
    let app = express();

    app.set('trust proxy', true);
    app.use(express.static(__dirname + '/public/'));
    app.use(express.static(__dirname + '/uploads/'));

    const router = require('./routes');
    router.setup(app);

    app.get('/*', (req, res) => { return res.status(302).redirect('/404.html'); });

    app.listen(PORT, () => {
        console.log('Starting ShareX Server on port: '.green + PORT.toString().white);
    });
};