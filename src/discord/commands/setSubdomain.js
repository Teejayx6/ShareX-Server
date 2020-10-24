const { MessageEmbed } = require('discord.js-light');

const { getUserFromKey, setUserDiscord, getUserFromDiscord, setUserSubDomain } = require('../../database/index');
const regex = /([a-z])/g;

let name = 'setsubdoman';
let aliases = ['setsub', 'ss', 'subdomain'];
let permissions = 0;
let run = async (msg, args, owner) => {
    // if (!owner) {
    //     console.log('a');
    // } else {
    let userData = await getUserFromDiscord(msg.author.id);
    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('You do not have an account.')
        .setColor('#e9172b'));

    let subdomain = args[0];
    if (!subdomain.match(regex) || subdomain.length > 63) return msg.channel.send(new MessageEmbed()
        .setTitle('The subdomain given does not match the requirements.')
        .setColor('#e9172b'));

    let success = await setUserSubDomain(userData.key, subdomain);
    if (success) return msg.channel.send(new MessageEmbed()
        .setTitle(`Success! Your subdomain is now \`${subdomain}\``)
        .setColor('#1eda61'));
    else return msg.channel.send(new MessageEmbed()
        .setTitle('An unknown error has occured, please try again..')
        .setColor('#e9172b'));
    // }
};

module.exports = { name, aliases, run, permissions };
