const fs = require('fs');
module.exports = {
	name: 'reg',
	description: 'Manages user registration',
	async execute(msg, args) {
		const data = require('../data/data.json');
		let reply = '';
		if (args[0] == 'player') {
			const playerlist = data.players;
			if (playerlist.includes(msg.author.id)) {
				playerlist.splice((playerlist.indexOf(msg.author.id) - 1), 1);
				reply = 'Usunięto Cię z listy graczy, <@' + msg.author.id + '>!';
			}
			else {
				playerlist.push(msg.author.id);
				reply = 'Dodano Cię do listy graczy, <@' + msg.author.id + '>!';
			}
			data.players = playerlist;
		}
		else if (args[0] == 'master') {
			data.master = msg.author.id;
			data.players.length = 0;
			reply = '**!! UWAGA !!**\nMistrz gry został zmieniony na <@' + msg.author.id + '>!\n\nLISTA GRACZY ZOSTAŁA WYCZYSZCZONA.';
		}
		fs.writeFileSync('data/data.json', JSON.stringify(data, null, '   '));
		msg.channel.send(reply);
	},
};