const colors = require('colors');

const database = require('../database/index');

module.exports.urlGET = async (ip, redirect) => {
  ip = await parseIP(ip);
  console.log(`${'[GET]'.green} ${'REDIRECTED'.bgMagenta.black} ${redirect.toString().bgGreen.black} ${ip.toString().bgWhite.black}`);
};

module.exports.urlPOST = async (url, ip, key) => {
  ip = await parseIP(ip);
  console.log(`${'[POST]'.cyan} ${'SAVED URL'.bgRed.black} ${url.toString().bgBlue.black} ${key.toString().bgYellow.black} ${ip.toString().bgWhite.black}`);
};

module.exports.filePOST = async (name, ip, key) => {
  ip = await parseIP(ip);
  console.log(`${'[POST]'.cyan} ${'SAVED FILE'.bgRed.black} ${name.toString().bgBlue.black} ${key.toString().bgYellow.black} ${ip.toString().bgWhite.black}`);
};

module.exports.fileGET = async (name, ip) => {
  ip = await parseIP(ip);
  console.log(`${'[GET]'.green} ${'SENT FILE'.bgMagenta.black} ${name.toString().bgGreen.black} ${ip.toString().bgWhite.black}`);
};

module.exports.fileDELETE = async (name, ip, key) => {
  ip = await parseIP(ip);
  console.log(`${'[POST]'.cyan} ${'DELETED FILE'.bgRed.black} ${name.toString().bgBlue.black} ${key.toString().bgYellow.black} ${ip.toString().bgWhite.black}`);
};

let parseIP = async (ip) => {
  ip = ip.replace('::ffff:', '').replace('::1', '127.0.0.1').replace('localhost', '127.0.0.1');
  let ipTest = ip.split('.')[0] + '.' + ip.split('.')[ip.split('.').length - 1];
  let ipData = await database.getIP(ipTest);
  if (ipData == null) return ip;
  return '[IP OMITTED]';
};