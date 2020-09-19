const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/file');

let name = 'fileinfo';
let aliases = ['fi'];
let run = async (msg, args) => {
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
        .setDescription(`Path: \`${fileData.path}\`\nUploader: \`${fileData.uploader}\`\nViews: \`${fileData.views}\`\nDate: \`${fileData.createdAt}\`\n`)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run };