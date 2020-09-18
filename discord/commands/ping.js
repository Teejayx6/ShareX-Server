const { MessageEmbed } = require("discord.js-light");

let name = 'ping';
let aliases = ['fuckoff'];
let run = async (msg, args) => {
    let embed = new MessageEmbed()
        .setTitle(`Ping! | ${msg.client.ws.ping}`);
    return msg.channel.send(embed);
};

module.exports = { name, aliases, run };