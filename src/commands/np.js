module.exports = {
    name: 'np',
    description: 'Get information about the music currently playing.',
    execute(message, args) {
        const _queue = message.client.queue.get(message.guild.id);
        if (!_queue) return message.reply('There is nothing playing.');
        return message.channel.send(`🎶 Now playing: **${_queue.songs[0].title}**`);
    }
};
