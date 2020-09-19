const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'userinfo';
let aliases = ['ui'];
let run = async (msg, args, owner) => {
    if (!owner) return msg.channel.send(new MessageEmbed()
        .setTitle(`You do not have the required permissions to run this command.`)
        .setColor('#e9172b'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a user.`)
        .setColor('#e9172b'));

    let uName = args[0];

    let userData = await userModel.findOne({ name: uName });

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#e9172b'));

    return msg.channel.send(new MessageEmbed()
        .setTitle(`User: \`${uName}\``)
        .setDescription(`**Key**: \`${userData.key}\`\n**Owner**: \`${userData.owner}\`\n**Uploads**: \`${userData.uploads}\`\n**Redirects**: \`${userData.redirects}\`\n**Discord**: ${userData.discord}`)
        .setColor('#1eda61'));
};

module.exports = { name, aliases, run };