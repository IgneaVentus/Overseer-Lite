const data = require('../data/data.json');
module.exports = {
	name: 'players',
	description: 'Replies with list of players',
	async execute(msg, args) {
		const list = '\n------GAME MASTER------\n   - ' + msg.guild.members.cache.get(data.master).user.username + '\n -------PLAYERS--------' + data.players.map(player => player = '\n   - ' + msg.guild.members.cache.get(player).user.username);
		await msg.channel.send('```' + list + '```');
	},
};