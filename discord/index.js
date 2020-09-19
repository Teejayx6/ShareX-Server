/*
    The discord bot index.js for yes
*/
const { Client, Collection } = require('discord.js-light');
const { readdirSync } = require('fs');
const colors = require('colors');

const userModel = require('../models/user');

let startBot = (userID, token, options) => {
    if (!userID) throw new Error('No user ID provided');
    if (!token) throw new Error('No bot token provided');
    try {
        let client = new Client(options);
        client.commands = new Collection();
        client.cmdAliases = new Collection();

        let files = readdirSync('./discord/commands').filter(f => f.endsWith('.js'));
        for (const file of files) {
            let command = require(`./commands/${file}`);
            client.commands.set(command.name, command);
            command.aliases.forEach(e => { client.cmdAliases.set(e, command.name); });
        }

        client.on('message', async (msg) => {
            if (!msg.content.startsWith('?')) return;
            // if (msg.author.id !== userID) return;
            let args = msg.content.split(' ').slice(1);
            let cmdName = msg.content.split(' ')[0].slice(1).toLowerCase();
            let cmd = client.commands.get(client.cmdAliases.get(cmdName) || cmdName);
            if (cmd == null) return;
            let userData = await userModel.findOne({ discord: msg.author.id });
            let owner = userData.owner || false;
            return await cmd.run(msg, args, owner);
        });

        client.on('ready', () => {
            console.log('Discord Bot has Started!'.green);
        });

        client.login(token);
    } catch (err) {
        return console.error(err);
    }
};

module.exports = { startBot };