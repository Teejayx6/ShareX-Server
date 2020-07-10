const config = require('../config.json');
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook(config.webhookurl);

const userModel = require('../models/user.js');
const urlModel = require('../models/url.js');

module.exports = async (req, res) => {
    let key = req.body.key;
    if (!key) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No Key.',
            fix: 'You need a valid key in order to upload.'
        }
    }));

    let userData = await userModel.findOne({ key: key });

    if (!userData) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'Invalid Key.',
            fix: 'You need a valid key in order to upload.'
        }
    }));

    let user = userData.name;

    if (userData.allowed == false) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'You are not yet allowed to upload.',
            fix: 'Wait until you are authorized to upload.'
        }
    }));

    let url = req.body.url;
    if (!url) return res.status(400).send(JSON.stringify({
        success: false,
        error: {
            message: 'No url was given.',
            fix: 'Use a url in body: (url | $input$ ).'
        }
    }));

    async function CreateUrl(length) {
        // if (typeof length !== Number) throw new Error('length is not a number');
        let number = Math.floor(Math.random() * (10 ** length)).toString('36');
        if (await urlModel.findOne({ id: number }))
            return CreateUrl(length);
        else return number;
    }

    let redirectNum = await CreateUrl(10);

    await urlModel.create({
        uploader: user,
        redirect: url,
        id: redirectNum,
        CreatedAt: new Date,
        views: 0,
        lock: {
            active: false,
            password: "none"
        }
    });

    let redirectUrl = config.protocol + config.url + "/url/" + redirectNum;

    let userRedirects = userData.redirects;
    let newUserRedirects = userRedirects + 1;
    await userModel.findOneAndUpdate({ key: key }, { redirects: newUserRedirects });

    let uploadEmbed = new MessageBuilder()
        .setTitle("URL Redirect Created")
        .setURL(redirectUrl)
        .addField('Created By:', userData.name)
        .addField('Redirects To:', url);
    await hook.send(uploadEmbed);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        success: true,
        url: redirectUrl
    }));
};