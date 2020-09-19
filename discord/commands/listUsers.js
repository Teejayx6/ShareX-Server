const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'listusers';
let aliases = ['lu', 'ls'];
let run = async (msg, args) => {
    let data = await userModel.find();

    let embed = new MessageEmbed()
        .setTitle("Users")
        .setColor('#1eda61');

    data.forEach(e => {
        embed.addField(e.name, e.key);
    });

    return msg.channel.send(embed);
};

module.exports = { name, aliases, run };