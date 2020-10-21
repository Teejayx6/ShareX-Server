const colors = require('colors');

const database = require('../database/index');

module.exports.urlGET = async (ip, redirect) => {
  ip = await parseIP(ip);
  let msg = `${'[GET]'.green} ${'REDIRECTED'.bgMagenta.black} ${redirect.toString().bgGreen.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

module.exports.urlPOST = async (url, ip, key) => {
  ip = await parseIP(ip);
  let msg = `${'[POST]'.cyan} ${'SAVED URL'.bgRed.black} ${url.toString().bgBlue.black} ${key.toString().bgYellow.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

module.exports.urlAPIGET = async (id, ip) => {
  ip = await parseIP(ip);
  let msg = `${'[GET]'.green} ${'SENT URL DATA'.bgMagenta.black} ${id.toString().bgBlue.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

module.exports.filePOST = async (name, ip, key) => {
  ip = await parseIP(ip);
  let msg = `${'[POST]'.cyan} ${'SAVED FILE'.bgRed.black} ${name.toString().bgBlue.black} ${key.toString().bgYellow.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

module.exports.fileAPIGET = async (name, ip) => {
  ip = await parseIP(ip);
  let msg = `${'[GET]'.green} ${'SENT FILE DATA'.bgMagenta.black} ${name.toString().bgBlue.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

module.exports.fileGET = async (name, ip) => {
  ip = await parseIP(ip);
  let msg = `${'[GET]'.green} ${'SENT FILE'.bgMagenta.black} ${name.toString().bgGreen.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

module.exports.fileDELETE = async (name, ip, key) => {
  ip = await parseIP(ip);
  let msg = `${'[POST]'.cyan} ${'DELETED FILE'.bgRed.black} ${name.toString().bgBlue.black} ${key.toString().bgYellow.black} ${ip.toString().bgWhite.black}`;
  console.log(msg);
};

let parseIP = async (ip) => {
  return ip.replace('::ffff:', '').replace('::1', '127.0.0.1').replace('localhost', '127.0.0.1');
};
