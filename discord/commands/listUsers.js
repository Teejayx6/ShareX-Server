const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'listusers';
let aliases = ['lu', 'ls'];
let run = async (msg, args) => {
    let data = await userModel.find();

    let embed = new MessageEmbed()
        .setTitle("Users")
        .setColor('#1eda61');

    let dataArray = [];

    data.forEach(e => {
        dataArray.push(e.name);
    });

    embed.setDescription(dataArray.join(', '));

    return msg.channel.send(embed);
};

module.exports = { name, aliases, run };