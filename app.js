const config = require('./config.json');
const users = config.users;
const keys = config.keys;

const PORT = config.port;

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const express = require('express');
const fileExists = require('file-exists');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const randomString = require('random-string');
const words = require('an-array-of-english-words');

toUpperCaseLetter = function (word) {
    output = word.charAt(0).toUpperCase() + word.slice(1);
    return output;
};

const colors = require('colors');


const routes = require('./routes/index');
const logger = require('./logger.js');

const app = express();

if (!fs.existsSync('./uploads/')) {
    fs.mkdirSync('./uploads/');
    logger.info('Created /uploads directory');
}

morgan.token('ip2', function (req, res) { return req.ip.replace('::ffff:', ''); });
app.use(morgan(`${colors.cyan(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "POST"; } }));
app.use(morgan(`${colors.green(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "GET"; } }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
        fileSize: config.fileSizeLimit
    }
}));

app.use(express.static(`${__dirname}/uploads/`));

app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');

app.get('/urls', (req, res) => { return routes.urls(req, res); });
app.get('/gallery', (req, res) => { return routes.urls(req, res); });

app.get('/', (req, res) => { return res.status(200).render('index', { req: req, res: res, config: config }); });
app.get('/glogin', (req, res) => { return res.status(200).render('glogin', { req: req, res: res, config: config }); }); ///fix tshis shits awudawpdk
app.get('/ulogin', (req, res) => { return res.status(200).render('ulogin', { req: req, res: res, config: config }); }); ///fix tshis shits awudawpdk
app.get('/upload', (req, res) => { return res.status(200).render('upload', { req: req, res: res, config: config }); });
// app.get('/about', (req, res) => { return res.status(200).render('about'); });
app.get('/404', (req, res) => { return res.status(200).render('404', { query: req.query.message }); });

app.get('/terano', (req, res) => { return res.status(200).redirect('https://top.gg/bot/647256366280474626'); });
app.get('/*', (req, res) => { return res.status(200).redirect(`${config.protocol}${config.serverUrl}:${config.port}/404`); });


app.post('/upload', (req, res) => routes.uploads(req, res));


app.listen(PORT, () => {
    logger.success(`Now listening on port ${PORT}`);
});