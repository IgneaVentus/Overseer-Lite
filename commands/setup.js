const fs = require('fs');

module.exports = {
	name: 'setup',
	description: 'Allows to reset bot to chosen channels',
	async execute(msg, args, bot) {
		const data = require('../data/data.json');
		const channels = ['ogólny', 'main'];
		let reply = '';
		try {
			if (args.length == 2) {
				channels[0] = args[0];
				channels[1] = args[1];
			}
			if (channels[0] == channels[1]) throw 'The channels are the same.';
			data.resch = msg.guild.channels.cache.find(channel => channel.name == channels[0]).id;
			data.gamech = msg.guild.channels.cache.find(channel => channel.name == channels[1]).id;
			data.guild = msg.guild.id;
			fs.writeFileSync('data/data.json', JSON.stringify(data, null, '   '));
			reply = 'No już, już, zapisałem wszystko od nowa.';
		}
		catch (e) {
			console.error(e);
			reply = 'Coś...poszło nie tak. Może któryś kanał nie istnieje, albo podano dwa razy ten sam?';
		}
		finally {
			msg.channel.send(reply);
		}
	},
};