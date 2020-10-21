const { MessageEmbed } = require('discord.js-light');

const { getUserFromName } = require('../../database/index');

let name = 'userinfo';
let aliases = ['ui'];
let permissions = 0;
let run = async (msg, args, owner) => {

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a user.`)
        .setColor('#e9172b'));

    let uName = args[0];

    let userData = await getUserFromName(uName);

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#e9172b'));

    if (!owner) {
        return msg.channel.send(new MessageEmbed()
            .setTitle(`User: \`${uName}\``)
            .setDescription(`**Uploads**: \`${userData.uploads}\`\n**Redirects**: \`${userData.redirects}\``)
            .setColor('#1eda61'));
    }

    return msg.channel.send(new MessageEmbed()
        .setTitle(`User: \`${uName}\``)
        .setDescription(`**Key**: \`${userData.key}\`\n**Owner**: \`${userData.owner}\`\n**Uploads**: \`${userData.uploads}\`\n**Redirects**: \`${userData.redirects}\`\n**Created at**: \`${userData.CreatedAt}\``)
        .setColor('#1eda61'));
};

module.exports = { name, aliases, run, permissions };
