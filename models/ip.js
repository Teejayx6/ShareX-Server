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
    ip = ip.replace('::ffff:', '').replace('::1', 'localhost');
    let ipData = await IPModel.findOne({ ip: ip });
    if (ipData == null) return ip;
    return '[IP OMITTED]';
};

//---------------------------------------------


let addIP = async (ip) => {
    ip = ip.replace('::ffff:', '').replace('::1', 'localhost');
    let ipData = await IPModel.findOne({ ip: ip });
    if (ipData !== null) return true;

    try {
        await IPModel.create({
            ip: String,
            CreatedAt: new Date(),
        });
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
};


module.exports = { parseIP, IPModel, addIP };