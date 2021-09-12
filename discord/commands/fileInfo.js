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
        .setColor('#4693f2'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a file (Include the file extention).`)
        .setColor('#4693f2'));

    let uName = args[0];

    let fileData = await userModel.findOne({ name: uName });

    if (fileData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('File does not exist.')
        .setColor('#4693f2'));

    return msg.channel.send(new MessageEmbed()
        .setTitle(`File: \`${uName}\``)
        .setDescription(`**Path**: \`${fileData.path}\`\n**Uploader**: \`${fileData.uploader}\`\n**Views**: \`${fileData.views}\`\n**Date**: \`${fileData.UploadedAt}\`\n`)
        .setColor('#4693f2'));
};

module.exports = { name, aliases, run };
