const Discord = require("discord.js");
const client = new Discord.Client();
const { prefix, token } = require("./config.json");

client.on('ready', () => {
    console.log("혜성봇 켜졌습니다");
    client.user.setActivity("빛나기");
});

client.on('message', (message) => {
    
});


client.login(token);
//https://discordapp.com/oauth2/authorize?client_id=756728393839411281&scope=bot&permissions=8