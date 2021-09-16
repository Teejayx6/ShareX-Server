const axios = require('axios');

const { MessageEmbed } = require('discord.js-light');


let name = 'shortner';
let aliases = ['s'];
let run = async (msg, args, owner) => {

let url = args[0]; 
let key = args[1];
