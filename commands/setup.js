const fs = require('fs');

module.exports = {
	name: 'setup',
	description: 'Sets up new user',
	async execute(msg, args) {
		const data = require('../data/data.json');
		data.resch = msg.guild.channels.cache.find(channel => channel.name == 'ogólny').id;
		data.gamech = msg.guild.channels.cache.find(channel => channel.name == 'main-rp').id;
		data.guild = msg.guild.id;
		fs.writeFileSync('data/data.json', JSON.stringify(data, null, '   '));
		msg.channel.send('No już, już, zapisałem wszystko od nowa.');
	},
};