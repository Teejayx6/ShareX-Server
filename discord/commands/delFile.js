const { existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');
let fileModel = require('../../models/file');

let name = 'deletefile';
let aliases = ['delfile', 'df'];
let run = async (msg, args) => {
    console.log(args[0]);
    if (!args[0]) return msg.channel.send('You must include the name of the file.');
    let fileName = args[0];

    let fileData = await fileModel.findOne({ name: fileName });
    if (fileData == null) return msg.channel.send('File not found.');

    let filePath = resolve(__dirname + `../../../uploads/${fileData.path}`);
    console.log(fileData.path);
    if (!existsSync(filePath)) {
        await fileModel.deleteOne({ name: fileName });
        return msg.channel.send('File does not exist.');
    }
    try {
        await fileModel.deleteOne({ name: fileName });
        unlinkSync(filePath);
    } catch (err) {
        console.error(err);
        return msg.channel.send('An unknown error has occured. Please try again.');
    }
    return msg.channel.send(`Deleted file: \`${fileName}\``);
};

module.exports = { name, aliases, run };