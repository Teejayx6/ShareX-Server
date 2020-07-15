const config = require('./config.json');
const router = require('./routes/index.js');

const express = require('express');
const app = express();
app.use(express.static(`${__dirname}/uploads/`));
app.use(express.static(__dirname + '/public/'));
app.set('view engine', 'ejs');

let connectUri = `mongodb+srv://${config.atlas.username}:${config.atlas.password}@${config.atlas.cluster}/sharex-test`;
// let connectUri = `mongodb://localhost/sharex`;

// const { connect } = require('mongoose');
// connect(`mongodb://localhost/sharex`, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });

const { connect } = require('mongoose');
connect(connectUri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const RateLimit = require('express-rate-limit');
const MongoStore = require('rate-limit-mongo');

let APILimiter = new RateLimit({
    store: new MongoStore({
        uri: connectUri,
        collectionName: "upload-limiter"
    }),
    windowMs: 10 * 60 * 1000,
    max: 50
});

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    safeFileNames: true,
    preserveExtension: true,
    limits: {
        fileSize: 8000000000
    }
}));

const colors = require('colors');
const morgan = require('morgan');
morgan.token('ip2', function (req, res) { return req.ip.replace('::ffff:', ''); });
app.use(morgan(`${colors.cyan(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "POST"; } }));
app.use(morgan(`${colors.green(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "GET"; } }));

app.get('/', (req, res) => { return router.about(req, res); });
app.get('/about', (req, res) => { return router.about(req, res); });
app.get('/login', (req, res) => { return router.login(req, res); });
app.get('/upload', (req, res) => { return router.upload(req, res); });
app.get('/gallery', (req, res) => { return router.gallery(req, res); });
app.get('/signup', (req, res) => { return router.signup(req, res); });
app.get('/dashboard', (req, res) => { return router.dashboard(req, res); });
app.get('/delete/*', (req, res) => { return router.delete(req, res); });
app.get('/files/*', (req, res) => { return router.files(req, res); });
app.get('/url/:number', (req, res) => { return router.url(req, res); });

app.get('/homepage', (req, res) => { return res.render('homepage.ejs'); });

app.get('/github', (req, res) => { return res.status(302).redirect('https://github.com/Million900o/ShareX-Server'); });
app.get('/terano', (req, res) => { return res.status(200).redirect('https://top.gg/bot/647256366280474626'); });
app.get('*', (req, res) => { return res.render('404.ejs', { req: req, res: res }); });

app.post('/api/url', APILimiter, (req, res) => { return router.apiUrl(req, res); });
app.post('/api/upload', APILimiter, (req, res) => { router.apiUpload(req, res); });

app.listen(config.port, () => { console.log(`Starting ShareX Server on port: `.green + `${config.port}`.white); });