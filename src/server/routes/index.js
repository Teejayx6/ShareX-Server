/*
    Main and setup file for routers
*/

/*
    Api
*/
const api = {};
api.file = require('./api/file');
api.deleteFile = require('./api/delete');
api.upload = require('./api/upload');
api.url = require('./api/url');
api.user = require('./api/user');

/*
    GET requests (browsers) 
*/
const File = require('./files');
const URL = require('./url');

/*
    Created so I wouldnt have a mess in the app.js
*/
let setup = (app) => {
    app.use(api.file);
    app.use(api.upload);
    app.use(api.url);
    app.use(api.user);
    app.use(api.deleteFile);
    app.use(File);
    app.use(URL);
};

//module exports (maybe I should change to exports default?)
module.exports = { api, File, URL, setup };
