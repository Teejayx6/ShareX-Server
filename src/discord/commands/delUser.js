/*
    The command to delete users
*/
const { MessageEmbed } = require('discord.js-light');

const { getUserFromName, delUser } = require('../../database/index');

let name = 'deluser';
let aliases = ['delu', 'du'];
let permissions = 100;
let run = async (msg, args, owner) => {
    if (!owner) return msg.channel.send(new MessageEmbed()
        .setTitle(`You do not have the required permissions to run this command.`)
        .setColor('#e9172b'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a user.`)
        .setColor('#e9172b'));

    let uName = args[0];

    let userData = await getUserFromName(uName);

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#e9172b'));

    if (userData.owner) return msg.channel.send(new MessageEmbed()
        .setTitle('You cannot delete a user marked as owner.\nTry demoting them first.')
        .setColor('#e9172b'));

    await delUser(userData.key);

    return msg.channel.send(new MessageEmbed()
        .setTitle(`Deleted User: \`${uName}\``)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run, permissions };