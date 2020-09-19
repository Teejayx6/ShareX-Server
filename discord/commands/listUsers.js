const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'listusers';
let aliases = ['lu', 'ls'];
let run = async (msg, args) => {
    let data = await userModel.find();

    let dataArray = [];

    data.forEach(e => {
        dataArray.push(`${e.name}\nUploads: ${e.uploads}\nRedirects: ${e.redirects}`);
    });

    let embed = new MessageEmbed()
        .setTitle("Users")
        .setDescription(dataArray.join('\n'))
        .setColor('#1eda61');

    return msg.channel.send(embed);
};

module.exports = { name, aliases, run };