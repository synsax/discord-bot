module.exports = {
	name: 'queue',
	description: 'Get information on the contents of the queue.',
	execute(message) {
		const queue = message.client.queue.get(message.guild.id);
		if (!queue) return message.channel.send('There is nothing playing.');
		return message.channel.send(`
__**Song queue:**__

${queue.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now playing:** ${queue.songs[0].title}
		`);
	}
};
