/*
    The router for deleting a file
*/
const { unlink } = require('fs');
const { Router } = require('express');
const { resolve } = require('path');

const { getUser, getFile, delFile } = require('../../database/index');
const { fileDELETE } = require('../../util/logger');

const router = Router();

router.get("/delete/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return fof(res);

    let fileData = await getFile(fileName);
    if (fileData == null) return fof(res);

    let key = req.query.key;
    if (!key) return res.status(400).send(JSON.stringify({
        error: "No key was privided."
    }));

    let userData = await getUser(key);
    if (userData == null) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided."
    }));

    if (userData.name !== fileData.uploader) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided."
    }));

    let filePath = resolve(`${__dirname}/../../../${fileData.path}`);
    await delFile(fileData.name);
    unlink(filePath, (err) => {
        if (err) throw err;
    });

    res.status(400).send(JSON.stringify({
        success: true,
        message: "File was deleted."
    }));

    fileDELETE(fileData.name, req.ip, key);
});

let fof = (res) => {
    res.status(404).send(JSON.stringify({
        error: "File does not exist."
    }));
    return;
};

module.exports = router;