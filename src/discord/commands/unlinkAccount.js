const { MessageEmbed } = require('discord.js-light');

const { getUserFromDiscord, setUserDiscord } = require('../../database/index');

let name = 'unlinkaccount';
let aliases = ['ula', 'unlinkacc', 'ulaccount'];
let permissions = 0;
let run = async (msg, args, owner) => {
    let userData = await getUserFromDiscord(msg.author.id);
    if (userData == null) return msg.channel.send(new MessageEmbed()
        .setTitle('You do no have an account linked.')
        .setColor('#e9172b'));

    await setUserDiscord(userData.key, "none");

    return msg.channel.send(new MessageEmbed()
        .setTitle('User Updated.')
        .setDescription(`**User**: \`${userData.name}\`\n**Discord ID**: \`none\`\n`)
        .setColor('#e9172b'));
};

module.exports = { name, aliases, run, permissions };
