const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'linkaccount';
let aliases = ['la', 'linkacc', 'laccount'];
let run = async (msg, args, owner) => {
    let userData = await userModel.findOne({ discord: msg.author.id });
    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('You do no have an account linked.')
        .setColor('#e9172b'));

    await userModel.updateOne({ discord: msg.author.id }, { discord: "none" });

    return msg.channel.send(new MessageEmbed()
        .setTitle('User Updated.')
        .setDescription(`**User**: \`${userData.name}\`\n**Discord ID**: \`"none"\`\n`)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run };