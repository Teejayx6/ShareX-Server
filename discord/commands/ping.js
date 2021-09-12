/*
    Basic ping command
*/
const { MessageEmbed } = require("discord.js-light");

let name = 'ping';
let aliases = ['fuckoff'];
let run = async (msg, args, owner) => {
    return msg.channel.send(new MessageEmbed()
        .setTitle(`Ping! | ${msg.client.ws.ping}ms`)
        .setColor('#4693f2'));
};

module.exports = { name, aliases, run };
