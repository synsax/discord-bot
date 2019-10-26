module.exports = {
    name: 'np',
    description: 'Get information about the music currently playing.',
    execute(message, args) {
        const queue = message.client.queue.get(message.guild.id);
        if (!queue) return message.reply('There is nothing playing.');
        return message.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
    }
}