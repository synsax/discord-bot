module.exports = {
    name: 'skip',
    description: 'Skip music.',
    execute(message, args) {
        const { voiceChannel } = message.member;
		if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const queue = message.client.queue.get(message.guild.id);
        if (!queue || !queue.connection || !queue.connection.dispatcher) return message.reply('There is nothing playing.');
        queue.connection.dispatcher.end('Skip command was used');
    }
}
