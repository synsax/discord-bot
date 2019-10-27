module.exports = {
	name: 'resume',
	description: 'Resume music.',
	execute(message) {
		const _queue = message.client.queue.get(message.guild.id);
		if (_queue && !_queue.playing) {
			_queue.playing = true;
			_queue.connection.dispatcher.resume();
			return message.channel.send('▶ Resumed the music for you!');
		}
		return message.channel.send('There is nothing playing.');
	}
};
