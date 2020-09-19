const{
    Client,
    Attatchment
} = require('discord.js');


const bot = new Client();

const PREFIX = "재균아 ";

const ytdl = require('ytdl-core');

var servers = {};

bot.on('ready', () => {
    console.log("connected as " + bot.user.tag);
    bot.user.setActivity("노래 연습");
});

bot.on('message', message => {
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0]){
        case null:
            message.channel.send("네? 부르셨습니까?");
            break;
        case '노래부르기' :
            message.channel.send("노래 못부르는데요");
            message.channel.send("https://www.youtube.com/watch?v=EboLX4nYUVg");
            break;
        case '노래틀기':

            function play(connection, message){
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], {filter: "audioonly"}));

                server.queue.shift();

                server.dispatcher.on("finish", function(){
                    if(server.queue[0]){
                        play(connection, message);
                    }else{
                        connection.disconnect();
                    }
                });
            }

            if(!args[1]){
                message.channel.send("노래 링크 주셔야지 틀어줄 수 있습니다");
                break;
            }
            if(!message.member.voice.channel){
                message.channel.send("들어가 있는 사람이 없어서 종료합니다");
                return;
            }
            if(!servers[message.guild.id]) servers[message.guild.id] = {
                queue : []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if(!message.member.voice.connection){
                message.member.voice.channel.join().then(function(connection){
                    play(connection, message);
                });
            }
            break;

            case "베리" :
                message.channel.send("베리는 맥심님이 만들어준 봇이죠");
                message.channel.send("베리를 초대하려면 https://discord.com/oauth2/authorize?client_id=743277415874429008&permissions=1006857280&scope=bot");
                break;
            
            case "도움말" :
                message.channel.send("재균봇에 온 것을 환영합니다");
                message.channel.send("저는 노래를 못 부르지만, 노래는 잘 선정해주죠");
                message.channel.send("'재균아 노래틀기 (링크)' 를 통해 노래를 틀면 됩니다");
                message.channel.send("노래를 넘어가려면 '재균아야 다음' 이라고 쓰면 되고 끄려면 '재균야 정지' 라고 쓰면 됩니다");
                message.channel.send("참고로 이스터에그도 있으니 찾아보시죠");
                message.channel.send("그리고 전 생수머신 아닙니다 :(");
                break;

            case '다음':  
                var server = servers[message.guild.id];
                if(server.dispatcher){
                    server.dispatcher.end();
                    message.channel.send("다음 노래로 넘어갑니다");
                }
                break;
            case '정지' :
                if(message.guild.voice.connection){
                    for(var i = server.queue.length - 1; i >= 0; i--){
                        server.queue.splice(i, 1);
                    }
                    server.dispatcher.end();
                    message.channel.send("음악을 종료합니다");
                    console.log('stopped the queue');
                    
                }
                if(message.guild.connection) message.guild.voice.connection.disconnect();
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
            case '카나미':
                message.channel.send("파이썬 겁나 잘하는 남자");
                break;
    }
})

bot.login("NzU2NzEyMzE4MjIxNTQ5NTk5.X2V1Qw.oIfFy5Yw0dn8g87URJHLU1y81zo")

// 재균봇 초대 명령어 : https://discordapp.com/oauth2/authorize?client_id=756712318221549599&scope=bot&permissions=8

// 재균아 노래틀기 https://www.youtube.com/watch?v=upXahZ_OQz8\

// 재균아 노래틀기 https://www.youtube.com/watch?v=antR6UYqZKk