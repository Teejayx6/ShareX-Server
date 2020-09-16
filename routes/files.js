const { Router } = require('express');
const { resolve } = require('path');
const { existsSync } = require('fs');

const router = Router();

let fileModel = require('../models/file');
let fofFilePath = resolve(`${__dirname}/../assets/404.png`);

const morgan = require('morgan');
const colors = require('colors');
morgan.token('ip2', function (req, res) { return req.ip.replace('::ffff:', '').replace('::1', 'localhost'); });
router.use(morgan(`${colors.cyan(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "POST"; } }));
router.use(morgan(`${colors.green(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "GET"; } }));

router.get("/files/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return fof(res);

    let fileData = await fileModel.findOne({ name: fileName });
    if (fileData == null) return fof(res);

    await fileModel.findOneAndUpdate({ name: fileName }, { views: fileData.views + 1 });

    let filePath = resolve(`${__dirname}/../${fileData.path}`);
    sendFile(res, filePath);
});

let sendFile = (res, Path) => {
    let filePath = resolve(Path);
    if (!existsSync(filePath)) return fof(res);
    res.sendFile(filePath);
};

let fof = (res) => {
    sendFile(fofFilePath);
    return;
};

module.exports = router;