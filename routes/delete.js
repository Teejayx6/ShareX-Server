const { unlink } = require('fs');
const { Router } = require('express');
const { resolve } = require('path');

const fileModel = require('../models/file');
const userModel = require('../models/user');

const router = Router();

router.get("/delete/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return fof(res);

    let fileData = await fileModel.findOne({ name: fileName });
    if (fileData == null) return fof(res);

    let key = req.query.key;
    if (!key) return res.status(400).send(JSON.stringify({
        error: "No key was privided."
    }));

    let userData = await userModel.findOne({ key: key });
    if (userData == null) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided."
    }));

    if (userData.name !== fileData.uploader) return res.status(400).send(JSON.stringify({
        error: "An incorrect key was privided."
    }));

    let filePath = resolve(`${__dirname}/../${fileData.path}`);
    await fileModel.deleteOne({ name: fileData.name });
    unlink(filePath, (err) => {
        if (err) throw err;
    });

    //-------------------------
    // Add discord webhook
    //-------------------------

    res.status(400).send(JSON.stringify({
        success: true,
        message: "File was deleted."
    }));

    let ip = req.ip.replace('::ffff:', '').replace('::1', 'localhost');
    console.log(`${'[GET]'.green} ${'DELETED FILE'.bgMagenta.black} ${fileData.name.bgGreen.black} ${ip.bgWhite.black}`);
});

let fof = (res) => {
    res.status(404).send(JSON.stringify({
        error: "File does not exist."
    }));
    return;
};

module.exports = router;