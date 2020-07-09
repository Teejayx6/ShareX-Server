const config = require('./config.json');
const router = require('./routes/index.js');

const express = require('express');
const app = express();
app.use(express.static(`${__dirname}/uploads/`));
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');

const { connect } = require('mongoose');
connect(`mongodb+srv://${config.atlas.username}:${config.atlas.password}@${config.atlas.cluster}/sharex`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
        fileSize: config.fileSizeLimit
    }
}));

const colors = require('colors');
const morgan = require('morgan');
morgan.token('ip2', function (req, res) { return req.ip.replace('::ffff:', ''); });
app.use(morgan(`${colors.cyan(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "POST"; } }));
app.use(morgan(`${colors.green(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "GET"; } }));

app.get('/', (req, res) => { router.about(req, res); });
app.get('/about', (req, res) => { router.about(req, res); });
app.get('/login', (req, res) => { router.login(req, res); });
app.get('/upload', (req, res) => { router.upload(req, res); });
app.get('/gallery', (req, res) => { router.gallery(req, res); });
app.get('/signup', (req, res) => { router.signup(req, res); });
app.get('/delete/*', (req, res) => { router.delete(req, res); });
app.get('/files/*', (req, res) => { return router.files(req, res); });

app.get('/terano', (req, res) => { return res.status(200).redirect('https://top.gg/bot/647256366280474626'); });
app.get('*', (req, res) => { return res.render('404.ejs', { req: req, res: res }); });

app.post('/upload', (req, res) => { router.apiUpload(req, res); });

app.listen(config.port, () => { console.log(`Starting ShareX Server on port: `.green + `${config.port}`.white); });