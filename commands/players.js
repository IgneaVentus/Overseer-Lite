const data = require('../data/data.json');
module.exports = {
	name: 'players',
	description: 'Replies with list of players',
	async execute(msg, args, bot) {
		try {
			const list = '\n------GAME MASTER------\n   - ' + bot.users.cache.get(data.master).username + '\n--------PLAYERS--------' + data.players.map(player => player = '\n   - ' + bot.users.cache.get(player).username);
			await msg.channel.send('```' + list + '```');
		}
		catch (e) {
			console.error('Fucking hell: ' + e);
		}
	},
};