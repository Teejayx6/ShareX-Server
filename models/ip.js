/*
    So people can opt out of getting logged I think
*/
const mongoose = require("mongoose");

const UrlSchema = mongoose.Schema({
    ip: String,
    CreatedAt: String,
});

let IPModel = mongoose.model("ip", UrlSchema);

//---------------------------------------------

let parseIP = async (ip) => {
    ip = ip.replace('::ffff:', '').replace('::1', '127.0.0.1').replace('localhost', '127.0.0.1');
    let ipTest = ip.split('.')[0] + '.' + ip.split('.')[ip.split('.').length - 1];
    let ipData = await IPModel.findOne({ ip: ipTest });
    if (ipData == null) return ip;
    return '[IP OMITTED]';
};

//---------------------------------------------

let addIP = async (ip) => {
    ip = ip.replace('::ffff:', '').replace('::1', '127.0.0.1').replace('localhost', '127.0.0.1');
    ip = ip.split('.')[0] + '.' + ip.split('.')[ip.split('.').length - 1];
    let ipData = await IPModel.findOne({ ip: ip });
    if (ipData !== null) return true;

    try {
        await IPModel.create({
            ip: ip,
            CreatedAt: new Date(),
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};

//---------------------------------------------

module.exports = { parseIP, IPModel, addIP };