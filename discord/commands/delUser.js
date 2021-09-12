#4693f2




/*
    The command to delete users
*/
const { MessageEmbed } = require('discord.js-light');

const userModel = require('../../models/user');

let name = 'deluser';
let aliases = ['delu', 'du'];
let run = async (msg, args, owner) => {
    if (!owner) return msg.channel.send(new MessageEmbed()
        .setTitle(`You do not have the required permissions to run this command.`)
        .setColor('#4693f2'));

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You must include the name of a user.`)
        .setColor('#4693f2'));

    let uName = args[0];

    let userData = await userModel.findOne({ name: uName });

    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('User does not exist.')
        .setColor('#4693f2'));

    if (userData.owner) return msg.channel.send(new MessageEmbed()
        .setTitle('You cannot delete a user marked as owner.\nTry demoting them first.')
        .setColor('#4693f2'));

    await userModel.deleteOne({ name: uName });

    return msg.channel.send(new MessageEmbed()
        .setTitle(`Deleted User: \`${uName}\``)
        .setColor('#4693f2'));
};

module.exports = { name, aliases, run };
