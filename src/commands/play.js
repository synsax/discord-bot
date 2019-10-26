const fs = require('fs');
const youtubedl = require('youtube-dl');
const { isUri } = require('valid-url');
module.exports = {
    name: 'play',
    description: 'Play music.',
    execute(message, args) {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) return message.reply('You must be joined to one of the voice channels.');
        const permissions = voiceChannel.permissionsFor(message.client.user);
		if (!permissions.has('CONNECT')) return message.reply('I cannot connect to your voice channel, make sure I have the proper permissions!');
		if (!permissions.has('SPEAK')) return message.reply('I cannot speak in this voice channel, make sure I have the proper permissions!');
        
        const url = isUri(args[0]);
        if (!url) return message.reply('Oops, sorry! This URL is not valid. :innocent:');

        const serverQueue = message.client.queue.get(message.guild.id);
        if (serverQueue && serverQueue.timeoutId !== null) {
            clearTimeout(serverQueue.timeoutId);
            message.client.queue.delete(message.guild.id);
        }

        const options = ['-x', '--audio-format', 'mp3'];
        let searchingMessage = null;
        message.channel.send('searching...').then(msg => searchingMessage = msg);
        youtubedl.getInfo(url, options, async (err, info) => {
            if (err) throw err;
            const songInfo = {
                id: info.id,
                title: info.title,
                url: url,
                is_live: info.is_live
            };

            if (serverQueue && serverQueue.timeoutId === null) {
                serverQueue.songs.push(songInfo);
                return message.channel.send(`✅ **${songInfo.title}** has been added to the queue!`);
            }
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel,
                connection: null,
                timeoutId: null,
                songs: [],
                volume: 2,
                playing: true
            };
            message.client.queue.set(message.guild.id, queueConstruct);
            queueConstruct.songs.push(songInfo);

            const play = async song => {
                const queue = message.client.queue.get(message.guild.id);
                // if (queue.timeoutId !== null) {
                //     clearTimeout(queue.timeoutId);
                //     queue.timeoutId = null;
                // }
                if (!song) {
                    queue.timeoutId = setTimeout(() => {
                        message.client.queue.delete(message.guild.id);
                        queue.voiceChannel.leave();
                    }, 300000);
                    return;
                }
                const music = youtubedl(song.url, options, { cwd: __dirname });
                searchingMessage.delete(0);
                const dispatcher = queue.connection.playStream(music);
                dispatcher.on('end', reason => {
                  dispatcher.destroy();
                  console.log(reason, 'song ended.');
                  queue.songs.shift();
                  play(queue.songs[0]);
                });
                dispatcher.on('error', err => {
                  console.log(err);
                });
                dispatcher.setVolumeLogarithmic(queue.volume / 5);
                queue.textChannel.send(`🎶 Start playing: **${song.title}**`);
            };
            
            try {
                const connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                play(queueConstruct.songs[0]);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                message.client.queue.delete(message.guild.id);
                await voiceChannel.leave();
                return message.channel.send(`I could not join the voice channel: ${error}`);
            }
        });
    }
};
