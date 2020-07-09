const config = require('../config.json');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config.webhookurl);

const userModel = require('../models/user.js');
const path = require('path');
const fs = require('fs');
module.exports = async (req, res) => {
    if (req.query.u && req.query.disc) {
        let user = req.query.u.toLowerCase();
        let discord = req.query.disc;

        let userU = await userModel.findOne({ name: user });
        if (userU) return res.redirect('/signup?message=User Already Exists');

        async function randomStr(len, arr) {
            let ans = '';
            for (i = len; i > 0; i--) {
                ans += arr[Math.floor(Math.random() * arr.length)];
            }
            let data = await userModel.findOne({ key: ans });
            if (data) return await randomStr(len, arr);
            else return ans;
        }

        let key = await randomStr(32, '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

        await userModel.create({
            key: key,
            discord: discord,
            name: user,
            logins: 0,
            uploads: 0,
            owner: false,
            admin: false,
            allowed: false
        });

        fs.mkdirSync(`${path.resolve("uploads")}\\${user}`);

        let signUpEmbed = new MessageBuilder()
            .setTitle("Account Created")
            .addField('Name:', user)
            .addField('Discord:', discord);
        await hook.send(signUpEmbed);

        return res.redirect(`/?message=User "${user}" created, use key: "${key}".`);
    } else return res.render('signup.ejs', { req: req, res: res });
};