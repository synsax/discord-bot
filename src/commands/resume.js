module.exports = {
	name: 'resume',
	description: 'Resume music.',
	execute(message) {
		const queue = message.client.queue.get(message.guild.id);
		if (queue && !queue.playing) {
			queue.playing = true;
			queue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}
};
