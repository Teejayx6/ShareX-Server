const logger = require('../logger');
const config = require('../config.json');
const users = config.users;
const keys = config.keys;

const fs = require('fs');
const path = require('path');

const words = require('an-array-of-english-words');

module.exports = (req, res) => {
    if (!req.query.u || !users[req.query.u]) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No user.',
            fix: 'Include a Username and Password to login with.'
        }
    }));

    const user = req.query.u;
    const password = users[req.query.u];

    if (req.query.p !== password) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'Incorrect Password.',
            fix: 'Use the correct password.'
        }
    }));

    let filePath = `./uploads/${user}/${req.query.filename}`;
    console.log(filePath);

    if (!fs.existsSync(filePath)) return res.status(404).send(JSON.stringify({
        success: false,
        error: {
            message: 'File Not Found.'
        }
    }));

    fs.unlink(filePath, (err) => {
        if (err) {
            logger.error(err + ' (' + user + ')');
            return res.status(500).send(err);
        } else {
            res.status(200).send(JSON.stringify({
                success: true,
                message: "Deleted file " + req.query.filename
            }));
        }
    });
};