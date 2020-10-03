/*
    The ShareX Server main file.
*/
const config = require('./config.json');
let PORT = config.port || 1234;

const colors = require('colors');

const express = require('express');
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

const discord = require('./discord/index');
if (config.token) { discord.startBot(config.token, config.botOptions); }
else console.log('Starting without a discord bot.'.red);

const fs = require('fs');
const database = require('./database');
database.init();
if (!fs.existsSync('./uploads/')) fs.mkdirSync('./uploads/');