module.exports = {
    name: 'kill',
    description: 'Delete queue and kill.',
    execute(message) {
        const { voiceChannel } = message.member;
        if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
        const _queue = message.client.queue.get(message.guild.id);
        if (!_queue) return message.reply('There is nothing playing.');
        _queue.songs = [];
        _queue.connection.dispatcher.end('Kill command has been used!');
        voiceChannel.leave();
    }
};
