const config = require('./config.json');

const app = require('./server/app');
app.start();

const database = require('./database/index');
database.init();

const discord = require('./discord/index');
if (config.token) { discord.startBot(config.token, config.botOptions); }
else console.log('Starting without a discord bot.'.red);

const fs = require('fs');
if (!fs.existsSync('./uploads/')) fs.mkdirSync('./uploads/');