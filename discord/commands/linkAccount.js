const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'linkaccount';
let aliases = ['la', 'linkacc', 'laccount'];
let run = async (msg, args, owner) => {
    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include a key.`)
        .setColor('#e9172b'));

    let uKey = args[0];

    let userData = await userModel.findOne({ key: uKey });

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#e9172b'));

    await userModel.findOneAndUpdate({ key: uKey }, { discord: msg.author.id });

    msg.delete();

    return msg.channel.send(new MessageEmbed()
        .setTitle('User Updated.')
        .setDescription(`**User**: \`${userData.name}\`\n**Discord ID**: \`${userData.discord}\`\n`)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run };