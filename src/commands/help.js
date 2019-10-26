const { RichEmbed } = require('discord.js');
module.exports = {
    name: 'help',
    description: 'Help command.',
    execute(message, args) {
        const embedObj = {
            color: 0x83D3A5,
	        title: 'Command list',
	        fields: [
	        	{
	        		name: '!play url',
	        		value: 'play sound from url.',
	        	}
	        ]
        }
        return message.reply({ embed: embedObj });
    }
};