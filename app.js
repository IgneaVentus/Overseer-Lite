const Discord = require('discord.js');
const fs = require('fs');
const config = require('./settings.json').Bot;
const data = require('./data/data.json');
const currentTimeout = ['', ''];
const responders = [];

const bot = new Discord.Client();

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	bot.commands.set(command.name, command);
}

bot.on('ready', () => {
	console.log('bot is ready');
	bot.guilds.cache.forEach(guild => {
		console.log(guild.name + ' ' + guild.id);
	});
});

bot.on('message', async (msg) => {
	if (msg.channel.id == data.gamech) {
		// Check if the master is author of message, and if it's true begin countdown
		if (msg.author.id == data.master) {
			// Clearing previous countdown in case where master responded again
			clearTimeout(currentTimeout[0]);
			clearTimeout(currentTimeout[1]);
			// Countdown and message sending
			currentTimeout[0] = setTimeout(() => {
				let responSense = 0;
				let reply = 'Budzimy się';
				data.players.forEach(player => {
					if (!responders.includes(player)) {
						reply += ', <@' + player + '>';
						responSense++;
					}
				});
				responders.length = 0;
				reply += '!';
				// Send message only if someone afked.
				if (responSense > 0) message(reply);
				currentTimeout[1] = setTimeout(() => {
					reply = 'Dodatkowy czas graczy minął, możesz zacząć pisać, Mistrzu <@' + data.master + '>!';
					// Send message only if someone afked.
					if (responSense > 0) message(reply);
				}, data.timerB * 60000);
			}, (data.timerA * 60000));
		}
		// Else check if author is part of players and if it is, add it to respondents to not bother someone active.
		else if (data.players.includes(msg.author.id) && !responders.includes(msg.author.id)) {
			responders.push(msg.author.id);
		}
	}

	else {
		// if our message doesnt start with our defined prefix, dont go any further into function
		if (!msg.content.startsWith(config.prefix)) {
			return;
		}

		// slices off prefix from our message, then trims extra whitespace, then returns our array of words from the message
		const args = msg.content.slice(config.prefix.length).trim().split(' ');

		// splits off the first word from the array, which will be our command
		const command = args.shift().toLowerCase();

		await bot.commands.get(command).execute(msg, args);
	}

});

function message(content) {
	bot.channels.cache.get(data.resch).send(content);
}

bot.login(config.token);