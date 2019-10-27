module.exports = {
    name: 'pause',
    description: 'Pause music.',
    execute(message, args) {
        const _queue = message.client.queue.get(message.guild.id);
        if (_queue && _queue.playing) {
            _queue.playing = false;
            _queue.connection.dispatcher.pause();
            return message.channel.send('⏸ Paused the music for you!');
        }
        return message.reply('There is nothing playing.');
    }
};
