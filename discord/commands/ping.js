const { MessageEmbed } = require("discord.js-light");

let name = 'ping';
let aliases = ['fuckoff'];
let run = async (msg, args) => {
    return msg.channel.send(new MessageEmbed()
        .setTitle(`Ping! | ${msg.client.ws.ping}ms`));
};

module.exports = { name, aliases, run };