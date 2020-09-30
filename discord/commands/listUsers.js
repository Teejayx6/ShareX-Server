const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'listusers';
let aliases = ['lu', 'ls'];
let run = async (msg, args, owner) => {
    if (!owner) return msg.channel.send(new MessageEmbed()
        .setTitle(`You do not have the required permissions to run this command.`)
        .setColor('#e9172b'));

    let data = await userModel.find();

    let embed = new MessageEmbed()
        .setTitle("Users")
        .setColor('#1eda61');

    let dataArray = [];

    data.forEach(e => {
        dataArray.push('`' + e.name + '`');
    });
	
	if(dataArray.join(', ').length > 2048) {
		embed.setDescription('Embed\'s description would exceed 2048 characters.');
		return msg.channel.send(embed);
	}
    embed.setDescription(dataArray.join(', '));

    return msg.channel.send(embed);
};

module.exports = { name, aliases, run };