const config = require('../config.json');
const database = require(`./${config.database}`);

module.exports = database;