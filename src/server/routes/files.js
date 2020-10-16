/*
    The router for getting a file
*/
const { Router } = require('express');
const { resolve } = require('path');
const { existsSync } = require('fs');

const { getFile, addFileView } = require('../../database/index');
const { fileGET } = require('../../util/logger');

const router = Router();

router.get("/files/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return fof(res);

    let fileData = await getFile(fileName);
    if (fileData == null) return fof(res);

    await addFileView(fileName);

    let filePath = resolve(`${__dirname}/../../../${fileData.path}`);
    sendFile(res, filePath);

    fileGET(fileName, req.ip);
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