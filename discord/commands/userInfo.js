const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'userinfo';
let aliases = ['ui'];
let run = async (msg, args, owner) => {

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a user.`)
        .setColor('#4693f2'));

    let uName = args[0];

    let userData = await userModel.findOne({ name: uName });

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#4693f2'));

    if (!owner) {
        return msg.channel.send(new MessageEmbed()
            .setTitle(`User: \`${uName}\``)
            .setDescription(`**Uploads**: \`${userData.uploads}\`\n**Redirects**: \`${userData.redirects}\``)
            .setColor('#4693f2'));
    }

    return msg.channel.send(new MessageEmbed()
        .setTitle(`User: \`${uName}\``)
        .setDescription(`**Key**: \`${userData.key}\`\n**Owner**: \`${userData.owner}\`\n**Uploads**: \`${userData.uploads}\`\n**Redirects**: \`${userData.redirects}\``)
        .setColor('#4693f2'));
};

module.exports = { name, aliases, run };
