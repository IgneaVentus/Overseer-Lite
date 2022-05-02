const data = require ('../data/data.json');
const fs = require('fs');
module.exports = {
	name: 'times',
	description: 'Allows changing waiting times',
	async execute(msg, args, bot) {
		let reply = '';
		if (args.length > 0) {
			data.timerA = args[0];
			data.timerB = args[1];
			fs.writeFileSync('data/data.json', JSON.stringify(data, null, '   '));
			reply = 'Czasy zostały zmienione na ' + args[0] + ' minut oraz ' + args[1] + ' minut!';
		}
		else {
			reply = 'Obecne czasy to ' + data.timerA + ' minut czekania na graczy i ' + data.timerB + ' minut czekania na mistrza!';
		}
		if (msg != '') msg.channel.send(reply);
	},
};