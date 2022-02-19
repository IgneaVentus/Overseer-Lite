module.exports = {
	name: 'help',
	description: 'Replies with list of commands',
	async execute(msg, args) {
		await msg.channel.send('```No hej! Oto moje komendy:\n\n   !ovs help \n   - Wyświetla tą wiadomość!!\n\n   !ovs players\n   - Wyświetla obecnych graczy oraz mistrza gry!\n\n   !ovs reg [player / master]\n   - Pozwala Ci się zarejestrować jako gracz lub mistrz gry! Użycie tej komendy ponownie do rejestracji jako gracz usunie Cię z rejestru, zaś po zmianie mistrza gry wszyscy gracze zostaną usunięci!\n\n   !ovs setup\n   - Sprawia, że bot odnawia zapisane kanały! Domyślnie szuka main-rp oraz ogólny!```');
	},
};