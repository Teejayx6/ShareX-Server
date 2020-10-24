const { MessageEmbed } = require('discord.js-light');

const { getUserFromKey, setUserDiscord, getUserFromDiscord, setUserDomain } = require('../../database/index');
const regex = /([a-z])/g;

let name = 'setdomain';
let aliases = ['sd', 'domain'];
let permissions = 0;
let run = async (msg, args, owner) => {
    let userData = await getUserFromDiscord(msg.author.id);
    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('You do not have an account.')
        .setColor('#e9172b'));

    let domain = args[0];

    let success = await setUserDomain(userData.key, domain);
    if (success) return msg.channel.send(new MessageEmbed()
        .setTitle(`Success! Your domain is now \`${domain}\``)
        .setColor('#1eda61'));
    else return msg.channel.send(new MessageEmbed()
        .setTitle('An unknown error has occured, please try again..')
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run, permissions };
