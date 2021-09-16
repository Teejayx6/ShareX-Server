const axios = require('axios');

const { MessageEmbed } = require('discord.js-light');


let name = 'shortner';
let aliases = ['s'];
let run = async (msg, args) => {

let url = args[0]; 
let key = args[1];

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You Must Include A URL.`)
        .setColor('#4693f2'));

