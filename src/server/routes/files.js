/*
    The router for getting a file
*/
const { Router } = require('express');
const { resolve } = require('path');
const { existsSync } = require('fs');

const { getFile, addFileView } = require('../../database/index');
const { fileGET } = require('../../util/logger');

const router = Router();

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 15
});
router.use(limiter);

router.get("/files/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return res.status(203).redirect('/404.html');

    let fileData = await getFile(fileName);
    if (fileData == null) return res.status(203).redirect('/404.html');

    await addFileView(fileName);

    let filePath = resolve(`${__dirname}/../../../${fileData.path}`);
    if (!existsSync(filePath)) return res.status(203).redirect('/404.html');

    fileGET(fileName, req.ip);

    return res.sendFile(filePath);
});

module.exports = router;
