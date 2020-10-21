/*
    The command to delete a file
*/
const { MessageEmbed } = require('discord.js-light');
const { existsSync, unlinkSync } = require('fs');
const { resolve } = require('path');

const { getFile, delFile, getUserFromDiscord } = require('../../database/index');

let name = 'deletefile';
let aliases = ['delfile', 'df'];
let permissions = 4;
let run = async (msg, args, owner) => {
    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include a file name. (Including the file extension)`)
        .setColor('#e9172b'));
    let fileName = args[0];

    let fileData = await getFile(fileName);
    if (fileData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('File Not Found.')
        .setColor('#e9172b'));

    let userData = await getUserFromDiscord(msg.author.id);
    if (userData == null || userData.name !== fileData.uploader) return msg.channel.send(new MessageEmbed()
        .setTitle('You are not the owner of that file.')
        .setColor('#e9172b'));

    let filePath = resolve(__dirname + `../../../${fileData.path}`);
    if (!existsSync(filePath)) {
        await delFile(fileName);
        return msg.channel.send(new MessageEmbed()
            .setTitle('File Not Found.')
            .setColor('#e9172b'));
    }
    try {
        await delFile(fileName);
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

module.exports = { name, aliases, run, permissions };
