const userModel = require('../../models/user');

let createKey = () => {
    let p1 = Math.floor(Math.random() * (10 ** 18)).toString(36);
    let p2 = Math.floor(Math.random() * (10 ** 18)).toString(36);
    let p3 = Math.floor(Math.random() * (10 ** 18)).toString(36);
    let string = p1 + p2 + p3;
    let urlTest = await userModel.findOne({ key: string });
    if (urlTest !== null) return CreateUrl();
    return string;
};

let name = 'newuser';
let aliases = ['newu', 'nu'];
let run = async (msg, args) => {
    if (!args[0]) return msg.channel.send('You must include the name of new user.');
    let uName = args[0];

    let userCheck = await userModel.findOne({ name: uName });
    if (userCheck !== null) return msg.channel.send('User already exists.');
    let key = createKey();
    await userModel.create({
        key: key,
        name: uName,
        owner: false,
        uploads: 0,
        redirects: 0,
    });

    return msg.channel.send(`Created user: \`${uName}\`\nKey: \`${key}\`\nOwner: \`false\``);
};

module.exports = { name, aliases, run };