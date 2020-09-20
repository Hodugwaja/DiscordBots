const Discord = require("discord.js");
const client = new Discord.Client()

client.on('ready', () => {
    console.log("혜성봇 켜졌습니다");
    client.user.setActivity("빛나기");
});
client.login('NzU2NzI4MzkzODM5NDExMjgx.X2WEPA.-OmeHt54Okj3bXMLUI86Elr_OEc');
//https://discordapp.com/oauth2/authorize?client_id=756728393839411281&scope=bot&permissions=8