let name = 'ping';
let aliases = [];
let run = async (msg, args) => {
    return msg.channel.send("Pong!");
};

module.exports = { name, aliases, run };