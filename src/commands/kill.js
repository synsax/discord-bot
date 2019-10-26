module.exports = {
    name: 'kill',
    description: 'Delete queue and kill.',
    execute(message, args) {
        const { voiceChannel } = message.member;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply('There is nothing playing.');
        queue.songs = [];
        queue.connection.dispatcher.end('Kill command has been used!');
    }
}