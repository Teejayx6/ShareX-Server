/*
    The command to delete a file
*/
const { MessageEmbed } = require('discord.js-light');
const { existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');

let fileModel = require('../../models/file');
let userModel = require('../../models/user');

let name = 'deletefile';
let aliases = ['delfile', 'df'];
let run = async (msg, args, owner) => {
    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include a file name. (Including the file extension)`)
        .setColor('#e9172b'));
    let fileName = args[0];

    let fileData = await fileModel.findOne({ name: fileName });
    if (fileData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('File Not Found.')
        .setColor('#e9172b'));

    let userData = await userModel.findOne({ discord: msg.author.id });
    if (userData == null || userData.name !== fileData.uploader) return msg.channel.send(new MessageEmbed()
        .setTitle('You are not the owner of that file.')
        .setColor('#e9172b'));

    let filePath = resolve(__dirname + `../../../${fileData.path}`);
    if (!existsSync(filePath)) {
        await fileModel.deleteOne({ name: fileName });
        return msg.channel.send(new MessageEmbed()
            .setTitle('File Not Found.')
            .setColor('#e9172b'));
    }
    try {
        await fileModel.deleteOne({ name: fileName });
        unlinkSync(filePath);
    } catch (err) {
        console.error(err);
        return msg.channel.send(new MessageEmbed()
            .setTitle('An unknown error has occured.\nPlease try again.')
            .setColor('#e9172b'));
    }

    return msg.channel.send(new MessageEmbed()
        .setTitle(`Deleted File: \`${fileName}\``)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run };