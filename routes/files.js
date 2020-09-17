const { Router } = require('express');
const { resolve } = require('path');
const { existsSync } = require('fs');

const router = Router();

let fileModel = require('../models/file');
let fofFilePath = resolve(`${__dirname}/../public/404.png`);

router.get("/files/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return fof(res);

    let fileData = await fileModel.findOne({ name: fileName });
    if (fileData == null) return fof(res);

    await fileModel.findOneAndUpdate({ name: fileName }, { views: fileData.views + 1 });

    let filePath = resolve(`${__dirname}/../${fileData.path}`);
    sendFile(res, filePath);

    let ip = req.ip.replace('::ffff:', '').replace('::1', 'localhost');
    console.log(`${'[GET]'.green} ${'SENT FILE'.bgMagenta.black} ${fileName.bgGreen.black} ${ip.bgWhite.black}`);
});

let sendFile = (res, Path) => {
    let filePath = resolve(Path);
    if (!existsSync(filePath)) return fof(res);
    res.sendFile(filePath);
};

let fof = (res) => {
    res.status(203).redirect('/404.html');
    return;
};

module.exports = router;