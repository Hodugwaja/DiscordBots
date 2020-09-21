const Discord = require('discord.js')
const { prefix, token } = require("./config.json");
const client = new Discord.Client()

client.on('ready', () => {
    console.log("connected as " + client.user.tag);
    console.log("하성봇 온!!");

    client.on('message', message => {
        switch(message.content){
            case '김상성':
            case '상성봇':
                message.reply("제 이름은 이제 김하성인데요");
                break;
            case '김하성' :
            case '하성봇' :
            case '하성아' :
                message.channel.send("네 부르셨습니까?");
                break;
            case '빅맥' :
                message.channel.send("참께빵 위에");
                setTimeout(function(){}, 500);
                message.channel.send("순살고기 패티 2장");
                setTimeout(function(){}, 500);
                message.channel.send("특별한 소스");
                setTimeout(function(){}, 500);
                message.channel.send("양상추");
                setTimeout(function(){}, 500);
                message.channel.send("치즈");
                setTimeout(function(){}, 500);
                message.channel.send("피클");
                setTimeout(function(){}, 500);
                message.channel.send("양파 까~지");
                setTimeout(function(){}, 1500);
                message.channel.send("빠 빠 빠빠빠");
                break;  
            case '아카 뮤직' :
            case '아카' :
                message.channel.send("삐짐뮤직");
                break;
            case '누' :
                message.channel.send("엉");
                break;
            case '쌀국수':
                message.channel.send("뚝배기");
                break;
        }
    })
    client.user.setActivity("야구");
})

client.login(token);
