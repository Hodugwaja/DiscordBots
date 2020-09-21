const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const { prefix, token } = require("./config.json");

const client = new Discord.Client();

const queue = new Map();

client.on('ready', () => {
  console.log("connected as " + client.user.tag);
  client.user.setActivity("노래 연습");
});

client.on('disconnect', () => {
  console.log(client.user.tag + " 퇴근합니다!");
});


client.on('message', message => {
  const serverQueue = queue.get(message.guild.id);
  if (message.author.bot) {
    return;
  }
  if (!message.content.startsWith(prefix)) return;
  let args = message.content.substring(prefix.length).split(" ");
  if (args[0] === "노래틀기") {
    
		if (message.channel.type === 'dm') return;

		const voiceChannel = message.member.voice.channel;
    for(var i = 0; i<args.length;i++){
      console.log(args[i]);
    }
		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}
		voiceChannel.join().then(connection => {
			const stream = ytdl(args[1], { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('finish', () => voiceChannel.leave());
		});
  }
});

client.login(token);

/*
  message.channel.send("'상우야 노래틀기 (링크)' 를 통해 노래를 틀면 됩니다");
  message.channel.send("노래를 넘어가려면 '상우야 다음' 이라고 쓰면 되고 끄려면 '상우야 정지' 라고 쓰면 됩니다");
  message.channel.send("참고로 이스터에그도 있으니 찾아보시죠")
*/