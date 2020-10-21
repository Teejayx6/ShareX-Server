/*
    The router for creating a short url
*/
const config = require('../../../config.json');

const { Router, json, urlencoded } = require('express');

const { getFile } = require('../../../database/index');
const { fileAPIGET } = require('../../../util/logger');

const router = Router();

router.use(json());
router.use(urlencoded({ extended: true }));

router.get("/api/file/:name", async (req, res) => {
    let fileName = req.params.name;
    if (!fileName) return res.status(401).json({
        "error": "No file name was privided in the body."
    });

    let fileData = await getFile(fileName);
    if (fileData == null) return res.status(404).json({
        "error": "File not found."
    });

    let returnObj = {
        "name": fileData.name,
        "path": fileData.path,
        "link": `${config.mainURL}/files/${fileData.name}`,
        "views": fileData.views,
        "uploader": fileData.uploader,
        "UploadedAt": fileData.UploadedAt,
        "lock": fileData.lock,
    };

    fileAPIGET(fileData.name, req.ip);

    return res.status(200).json(returnObj);
});

module.exports = router;
