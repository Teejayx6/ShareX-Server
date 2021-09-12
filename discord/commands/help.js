const { MessageEmbed } = require('discord.js-light');


let name = 'help';
let aliases = ['h'];
let run = async (msg, args, owner) => {

    return msg.channel.send(new MessageEmbed()
        .setTitle(`Help`)
        .setDescription(`**userinfo**: \`Gets Info On A User\`\n**fileinfo**: \`Gets Info On A File\`\n**ping**: \`Gets The Bots Ping\`\n**linkaccount**: \`Links Your Discord Account To Your h4x3r.xyz account\`\n**unlinkaccount**: \`Unlinks Your Discord Account From your h4x3r.xyz account\`\n**help**: \`Shows This Help Menu\`\n**delfile**: \`Deletes A Uploaded FIle\``)
        .setColor('#4693f2'));
};

module.exports = { name, aliases, run };
