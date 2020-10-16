const config = require('../config.json');
const database = require(`./custom/${config.database}`);

module.exports = database;