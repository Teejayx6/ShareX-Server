/*
    The command to get info about a file
*/
const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/file');

let name = 'fileinfo';
let aliases = ['fi'];
let run = async (msg, args, owner) => {
    if (!owner) return msg.channel.send(new MessageEmbed()
        .setTitle(`You do not have the required permissions to run this command.`)
        .setColor('#e9172b'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a file (Include the file extention).`)
        .setColor('#e9172b'));

    let uName = args[0];

    let fileData = await userModel.findOne({ name: uName });

    if (fileData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('File does not exist.')
        .setColor('#e9172b'));

    return msg.channel.send(new MessageEmbed()
        .setTitle(`File: \`${uName}\``)
        .setDescription(`**Path**: \`${fileData.path}\`\n**Uploader**: \`${fileData.uploader}\`\n**Views**: \`${fileData.views}\`\n**Date**: \`${fileData.UploadedAt}\`\n`)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run };