module.exports = {
    name: 'help',
    description: 'Help command.',
    execute(message, args) {
        const embedObj = {
          title: '**I made this command for you, You\'re welcome :wink:**',
          description: '対応しているサイトは、YouTube, niconico, Twitch, Twitter, FB, TikTok, dailymotion, vimeo, ||Pornhub, RedTube, fc2, Tube8, You(r)Porn, XHamster||, etc...\nライブは対応してないよ\n[Source code](https://github.com/synsax/discord-bot)',
          color: 0x83D3A5,
	        fields: [
	        	{
	        		name: '!play url',
	        		value: ' urlの音声を再生するよ',
	        	},
            {
              name: '!skip',
              value: ' 再生している音楽をスキップするよ',
            },
            {
              name: '!pause',
              value: '再生している音楽の再生を一時停止するよ。',
            },
            {
              name: '!resume',
              value: '一時停止している音楽を再生するよ。',
            },
            {
              name: '!queue',
              value: 'プレイリストを表示するよ',
            },
            {
              name: '!np',
              value: '再生している音楽の詳細を表示するよ',
            },
            {
              name: '!volume n',
              value: 'nのところを数字に入れ替えて指定した音量に変更できるよ',
            },
            {
              name: '!kill',
              value: 'LKが死ぬよ',
            },
	        ]
        }
        return message.reply({ embed: embedObj });
    }
};
