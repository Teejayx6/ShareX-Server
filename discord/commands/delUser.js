const userModel = require('../../models/user');

let name = 'deluser';
let aliases = ['delu', 'du'];
let run = async (msg, args) => {
    if (!args[0]) return msg.channel.send('You must include the name of a user.');

    let uName = args[0];

    let userData = await userModel.findOne({ name: uName });
    if (userData == null) return msg.channel.send('User does not exist.');
    if (userData.owner) return msg.channel.send('You cannot delete a user marked as owner.\nTry demoting them first');
    await userModel.deleteOne({ name: uName });

    let embed = new MessageEmbed()
        .setTitle(`Deleted User: \`${uName}\``)
        .setColor('#e9172b');
    return msg.channel.send(embed);
};

module.exports = { name, aliases, run };