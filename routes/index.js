const uploadFile = require('./apiUpload');
const createURL = require('./apiURL');
const deleteFile = require('./delete');
const getFile = require('./files');
const URL = require('./URL');

let setup = (app) => {
    app.use(getFile);
    app.use(deleteFile);
    app.use(uploadFile);
    app.use(createURL);
    app.use(URL);
};

module.exports = { uploadFile, deleteFile, getFile, URL, createURL, setup };