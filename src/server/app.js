/*
    The ShareX Server main file.
*/
const config = require('../config.json');
let PORT = config.port || 1234;

// Fancy colors
const colors = require('colors');

const express = require('express');

module.exports.start = () => {
    // Create the server
    let app = express();

    // Middleware
    app.set('trust proxy', true);
    app.use(express.static(__dirname + '/public/'));
    app.use(express.static(__dirname + '/uploads/'));

    // Router
    require('./routes').setup(app);

    // 404 message
    app.get('/*', (req, res) => { return res.status(302).redirect('/404.html'); });

    // Start server and log
    app.listen(PORT, () => {
        console.log('Starting ShareX Server on port: '.green + PORT.toString().white);
    });
};
