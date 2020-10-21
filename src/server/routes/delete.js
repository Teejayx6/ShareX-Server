/*
    The router for deleting a file
*/
const { unlink } = require('fs');
const { Router } = require('express');
const { resolve } = require('path');

const { getUserFromKey, getFile, delFile } = require('../../database/index');
const { fileDELETE } = require('../../util/logger');

const router = Router();

router.get("/delete/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return res.status(200).json({
        "error": "File does not exist."
    });

    let fileData = await getFile(fileName);
    if (fileData == null) return res.status(404).json({
        "error": "File does not exist."
    });

    let key = req.query.key;
    if (!key) return res.status(400).json({
        "error": "No key was privided."
    });

    let userData = await getUserFromKey(key);
    if (userData == null) return res.status(400).json({
        "error": "An incorrect key was privided."
    });

    if (userData.name !== fileData.uploader) return res.status(400).json({
        "error": "An incorrect key was privided."
    });

    let filePath = resolve(`${__dirname}/../../../${fileData.path}`);
    await delFile(fileData.name);
    unlink(filePath, (err) => {
        if (err) throw err;
    });

    res.status(400).json({
        "success": true,
        "message": "File was deleted."
    });

    fileDELETE(fileData.name, req.ip, key);
});

module.exports = router;
