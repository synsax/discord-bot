module.exports = {
    name: 'pause',
    description: 'Pause music.',
    execute(message, args) {
        const queue = message.client.queue.get(message.guild.id);
        if (queue && queue.playing) {
            queue.connection.dispatcher.pause();
            return message.channel.send('⏸ Paused the music for you!');
        }
        return message.reply('There is nothing playing.');
    }
}