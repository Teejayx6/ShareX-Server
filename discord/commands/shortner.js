const axios = require('axios');
const config = require('../../config.json');

const { MessageEmbed } = require('discord.js-light');


let name = 'shortner';
let aliases = ['s'];
let run = async (msg, args) => {

let key = args[0]; 
let url = args[1];

    if (!args[0]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You Must Include A Key.`)
        .setColor('#4693f2'));
    if (!args[1]) return msg.channel.send(new MessageEmbed()
        .setTitle(`You Must Include A URL.`)
        .setColor('#4693f2'));
        
var options = {
  method: 'POST',
  url: config.uploadURL,
  headers: {
    'content-type': 'application/json',
    'key': args[0],
  },
  data: {
    url: args[1]
  }
};
axios.request(options).then(function (response) {
	console.log(response.data);
  urll = response.data
  console.log(urll.url)
      return msg.channel.send(new MessageEmbed()
        .setTitle(`Your Shortend Url`)
        .setDescription(urll.url)
        .setColor('#4693f2'));

});
};
module.exports = { name, aliases, run };

