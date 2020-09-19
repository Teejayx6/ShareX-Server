/*
    The ShareX Server main file.
*/
const config = require('./config.json');
let PORT = config.port || 1234;
let connectURI = config.connectURI || "mongodb://localhost/sharex-server";

const router = require('./routes');
const colors = require('colors');
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(connectURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const express = require('express');
let app = express();
app.set('trust proxy', true);
app.use(express.static(__dirname + '/public/'));
router.setup(app);
app.get('/*', (req, res) => { return res.status(302).redirect('/404.html'); });

app.listen(PORT, () => {
    console.log('Starting ShareX Server on port: '.green + PORT.toString().white);
});

let discord = require('./discord/index');
if (config.token && config.userID) { discord.startBot(config.userID, config.token, config.botOptions); }
else console.log('Starting without a discord bot.'.red);

if (!fs.existsSync('./uploads/')) fs.mkdirSync('./uploads/');