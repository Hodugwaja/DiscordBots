const Discord = require("discord.js");
const { prefix, token } = require("./config.json");
const ytdl = require("ytdl-core");
const { EMSGSIZE } = require("constants");

const client = new Discord.Client();

const queue = new Map();
client.on('ready', () => {
    console.log("connected as " + client.user.tag);
    client.user.setActivity("크린토피아 운영");
});

client.on('disconnect', () => {
    console.log(client.user.tag + " 퇴근합니다!");
});

client.on("message", async message => {
  if(message.content == "호구과자라는 분이 만든 봇"){
    message.reply("흙흙 상우봇 상처받음");
  }
  if (message.author.bot) {
      return;
  }
  if (!message.content.startsWith(prefix)) return;

  const serverQueue = queue.get(message.guild.id);

  if (message.content.startsWith(`${prefix}노래틀기 `)) {
    execute(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}다음`)) {
    skip(message, serverQueue);
    return;
  } else if (message.content.startsWith(`${prefix}정지`)) {
    stop(message, serverQueue);
    return;
  } else {
    let args = message.content.substring(prefix.length).split(" ");

    switch(args[0]){
        case '테스트':
            message.channel.send("가나다라마바사아자차카타파하");
            break;
        case '노래부르기':
            message.channel.send("음 전 노래 부르기 좀 그러네요");
            message.channel.send("재균봇에게 노래 불러다갈라고 해보시죠");
            message.channel.send("재균봇 없으면 링크로 초대하시죠");
            message.channel.send("https://discordapp.com/oauth2/authorize?client_id=756712318221549599&scope=bot&permissions=8");
            break;
        case "소개":
            message.channel.send("안녕하세요 상우봇 입니다");
            message.channel.send("프사는 현 키움히이로즈 마무리 투수 조상우를 모티브로 했고");
            message.channel.send("원래는 재균 봇을 대신해 음악 봇을 만들려고 했지만");
            message.channel.send("버그에 걸려서 현재는 챗봇입니다");
            message.channel.send("뭐 버그를 고치거나 아니면 게임 봇이 될수 있을것 같네요");
            break;
        case "상우":
        case "조상우":
            message.channel.send("음 제 모티브가 되는 사람이군요");
            message.channel.send("현재 키움히어로즈 마무리 투수인 조상우입니다")
            message.channel.send("특징은 파이어볼러 최대 155km의 공을 던지죠");
            message.channel.send("별명으로는 크린토피아 라는 별명 있습니다");
            break;
        case "베리" :
            message.channel.send("베리는 맥심님이 만들어준 봇이죠");
            message.channel.send("베리를 초대하려면 https://discord.com/oauth2/authorize?client_id=743277415874429008&permissions=1006857280&scope=bot");
            break;
        case "라커룸":
            message.channel.send("락커룸이요? 별거 없는데요");
            message.channel.send("진짜에요 보여줄게요");
            message.channel.send("https://img.crazzzybaseball.com/edimg/5f618422cd1a5.jpg");
            break;
        case "하성봇":
            if(args[1] === "라커룸"){
              message.channel.send("김하성 락커룸 ㄹㅇ 실화냐");
              message.channel.send("누가보면 이사하는 것 같았음 ㅋㅋㄹㅃㅃ");
              message.channel.send("https://img.crazzzybaseball.com/edimg/5f6183e307543.jpg");
              break;
            }
            message.channel.send("제 형이죠");
            message.channel.send("실제로는 동생이지만");
            message.channel.send("조상우 대뷔 : 2013년 1라운드 | 김하성 대뷔 : 2014년 2차 3라운드");
            message.channel.send("하성봇 초대나 하죠");
            message.channel.send("https://discordapp.com/oauth2/authorize?client_id=707858144164053063&scope=bot&permissions=8")
            break;
        case "도움말" :
            message.channel.send("상우봇에 온 것을 환영합니다");
            message.channel.send("저는 챗봇입니다. 상우야 다음으로 입력해주시죠");
            message.channel.send("그리고 전 크린토피야 운영하지 않습니다 :(");
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
        case '준상봇':
            message.channel.send("파쿠르 못하는 방세준님이 만든 봇입니다");
            message.channel.send("중2병이지만 그래도 좋은 애일거에요");
            message.channel.send("https://discord.com/oauth2/authorize?client_id=756796849645420646&scope=bot&permissions=8");
            message.channel.send("있으면 한번 저에 대해서 물어보죠");
            message.channel.send("준상아 상우");
            break;
        case '기아':
            message.channel.send("~~아빠 은퇴... 기아 절대 잊지 않을것...~~");
            message.channel.send("라고 정후가 하네요... 전 아무 말도 안했습니다");
            break;
        case '1딸라':
            message.channel.send("는 너무 적소... 4딸라 쯤 ㅎ...");
            message.channel.send("난 김두한이 아니야!!");
            break;
        case "호두과자":
            message.channel.send("어.. 휴게소의 명물 맛있는거 이기도 하지만");
            message.channel.send("저를 개발해준 분이기도 하죠 ㅎㅎ");
            break;
        case "크시":
          message.channel.send("팀 크레센도에서 개발된 봇이죠");
          message.channel.send("파이썬으로 만들어졌고, 저와 하성봇 보다 나은 봇 같네요");
          setTimeout(function(){}, 1000);
          message.channel.send("그만 알아보자");
          break;
        case "배추봇":
          message.channel.send("팀 크레센도에서 개발된 봇이죠");
          message.channel.send("파이썬으로 만들어졌고, 준상봇 처럼 싸가지는 없어도 저보다 나은 봇 같네요");
          setTimeout(function(){}, 1000);
          message.channel.send("그만 알아보자");
          break;
        case "이프":
          message.channel.send("팀 크레센도 산하 키뮤소프트웨어에서 개발된 봇이죠");
          message.channel.send("검열하고 낚시하는 애인데... 호두과자님 말에 따르자면");
          message.channel.send("개발자 중 한명과 같은 서버가 있는데...");
          message.channel.send("어... 욕만 26만줄 봤다고 (눈물)");
          break;
        case "하리보":
          message.channel.send("그 노래하는 하리보를 말하는 거면");
          message.channel.send("전설이 하나 생각나죠");
          message.channel.send("어... 호두과자님이 사실 저와 재균봇을 이렇게 만들다가...")
          setTimeout(function(){}, 1000);
          message.channel.send("그만 알아보자");
          break;
        case "방세준":
          message.channel.send("(올리브)빵이고");
          message.channel.send("파쿠르 못하고");
          message.channel.send("올리브 빵을 보고 군침이 마른 쯔위");
          break;
        case "늅":
        case "레전드늅":
          message.channel.send("체인소우 ㄱ.. 이 아니라");
          message.channel.send("바구미 입니다");
          break;
        case "HTML" :
          message.channel.send("HTML은 최고의 프로그래밍 언어 입ㄴ...");
          message.channel.send("는 얼어죽을");
          break;
        case "정륜":
          message.channel.send("4차원존재이자 인류의 머리로는 이해할수없는 존재");
          break;
        case "깃헙":
          message.channel.send("https://github.com/cropMr/DiscordBots");
          message.channel.send("이곳에 저 뿐만 아니라 호두과자님이 제작한 다른 봇들도 같이 있습니다");
          break;
        case "초대":
          message.channel.send("https://discordapp.com/oauth2/authorize?client_id=756727028660699197&scope=bot&permissions=8");
          message.channel.send("여기 초대장이요. 단 당신이 그 서버의 관리자여만 초대할 수 있어요");
          break;
        case "맥집":
          message.channel.send("하이픽셀 잘하고 자바하는 맥심");
          break;
        case "눈공":
          message.channel.send("power director 15로 편집하는 자");
          break;
        case "끼루":
          message.channel.send("게이보그");
          break;
        default:
            message.channel.send("잘 알아듣지 못했습니다");
            break;
    }
  }
});

async function execute(message, serverQueue) {
  const args = message.content.split(" ");

  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel)
    return message.channel.send("아조씨 나가시면 안되죠 다시 들어오세요");
  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
    return message.channel.send("아조씨 제가 음성 채널의 입장권과 발언권은 주셔야죠");
  }

  const songInfo = await ytdl.getInfo(args[1]);
  const song = {
    title: songInfo.title,
    url: songInfo.video_url
  };

  if (!serverQueue) {
    const queueContruct = {
      textChannel: message.channel,
      voiceChannel: voiceChannel,
      connection: null,
      songs: [],
      volume: 5,
      playing: true
    };

    queue.set(message.guild.id, queueContruct);

    queueContruct.songs.push(song);

    try {
      var connection = await voiceChannel.join();
      queueContruct.connection = connection;
      play(message.guild, queueContruct.songs[0]);
    } catch (err) {
      console.log(err);
      queue.delete(message.guild.id);
      return message.channel.send(err);
    }
  } else {
    serverQueue.songs.push(song);
    return message.channel.send(`${song.title}라는 노래 추가합니다`);
  }
}

function skip(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("아조씨 나가시면 안되죠 다시 들어오세요");
  if (!serverQueue)
    return message.channel.send("다음 노래 없음 ㅅㄱ");
  serverQueue.connection.dispatcher.end();
}

function stop(message, serverQueue) {
  if (!message.member.voice.channel)
    return message.channel.send("아조씨 나가시면 안되죠 다시 들어오세요!");
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end();
}

function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on("finish", () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on("error", error => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`노래곡 : **${song.title}**`);
}

const inviteSangWoo = {
  color: 0x0099ff,
	title: '상우봇 초대',
	url: './상우봇',
	author: {
		name: '상우봇 초대하기',
		icon_url: './상우봇.jpg',
		url: 'https://discordapp.com/oauth2/authorize?client_id=756727028660699197&scope=bot&permissions=8',
	},
	description: 'Made by 호두과자#8981',
}

const inviteJunSang = {
  color: 0x0099ff,
	title: '준상봇 초대',
	url: './상우봇.jpg',
	author: {
		name: '준상봇 초대하기',
		icon_url: './상우봇.jpg',
		url: 'https://discord.com/oauth2/authorize?client_id=756796849645420646&scope=bot&permissions=8',
	},
	description: 'Made by BangSeJun',
}

client.login(token);

//https://discordapp.com/oauth2/authorize?client_id=756727028660699197&scope=bot&permissions=8
//https://discordapp.com/oauth2/authorize?client_id=757219938644787200&scope=bot&permissions=8
//https://discordapp.com/oauth2/authorize?client_id=707858144164053063&scope=bot&permissions=8
//https://discordapp.com/oauth2/authorize?client_id=756712318221549599&scope=bot&permissions=8
