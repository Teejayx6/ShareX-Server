const { unlink } = require('fs');
const { Router } = require('express');
const { resolve } = require('path');

const fileModel = require('../models/file');
const userModel = require('../models/user');

const router = Router();

const morgan = require('morgan');
const colors = require('colors');
morgan.token('ip2', function (req, res) { return req.ip.replace('::ffff:', '').replace('::1', 'localhost'); });
router.use(morgan(`${colors.cyan(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "POST"; } }));
router.use(morgan(`${colors.green(':method')} ${colors.yellow(":ip2")} ${colors.bold(':url')} ${colors.red(":response-time")}`, { skip: function (req, res) { return req.method !== "GET"; } }));

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

    return res.status(400).send(JSON.stringify({
        success: true,
        message: "File was deleted."
    }));
});

let fof = (res) => {
    res.status(404).send(JSON.stringify({
        error: "File does not exist."
    }));
    return;
};

module.exports = router;